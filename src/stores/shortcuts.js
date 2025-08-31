// src/stores/shortcuts.js
import { defineStore } from 'pinia'

/**
 * Central store for search settings + fully customizable shortcuts.
 * All LocalStorage I/O lives here.
 *
 * STORAGE_KEY shape:
 * {
 *   provider: "Google" | "DuckDuckGo" | "Bing" | "Perplexity",
 *   openMode: "current" | "new",
 *   shortcuts: [{ id, label, icon, href }, ...]   // user-defined, no hardcoded catalog
 * }
 */

// Provider options for the search box (UI uses these for labels/icons)
export const PROVIDER_OPTIONS = [
  { value: 'Google', label: 'Google', si: 'google' },
  { value: 'DuckDuckGo', label: 'DuckDuckGo', si: 'duckduckgo' },
  { value: 'Bing', label: 'Bing', si: 'bing' },
  { value: 'Perplexity', label: 'Perplexity', si: 'perplexity' },
]
const ALLOWED_PROVIDERS = new Set(PROVIDER_OPTIONS.map((o) => o.value))
const STORAGE_KEY = 'shortcuts.settings.v1'

const DEFAULTS = {
  provider: 'Google',
  openMode: 'current', // 'current' | 'new'
  shortcuts: [], // no seeded icons; user controls everything
}

/**
 * Normalize a user-provided shortcuts array to a clean, deduped list.
 * Does not inject any site-specific defaults.
 */
function normalizeShortcuts(input) {
  const out = []
  const seen = new Set()
  if (!Array.isArray(input)) return []

  for (const raw of input) {
    if (!raw || typeof raw !== 'object') continue
    let id = (raw.id ?? '').toString().trim()
    let label = (raw.label ?? '').toString().trim()
    let icon = (raw.icon ?? '').toString().trim()
    let href = (raw.href ?? '').toString().trim()

    // derive id if missing (best-effort slug from label)
    if (!id) {
      if (label) {
        id =
          label
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '')
            .slice(0, 40) || 'item'
      } else {
        continue
      }
    }
    if (seen.has(id)) continue
    seen.add(id)

    if (!label) label = id
    // keep icon/href as provided (empty string allowed) — no site-specific defaults here

    out.push({ id, label, icon, href })
  }

  return out
}

function safeLoad() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULTS }

    const data = JSON.parse(raw) || {}
    const provider = ALLOWED_PROVIDERS.has(data.provider) ? data.provider : DEFAULTS.provider
    const openMode = data.openMode === 'new' ? 'new' : DEFAULTS.openMode

    // Primary: load user-defined shortcuts array (no hardcoded fill)
    if (Array.isArray(data.shortcuts)) {
      return { provider, openMode, shortcuts: normalizeShortcuts(data.shortcuts) }
    }

    // Legacy migration: if an old `order: string[]` exists, convert to minimal objects
    // (id + label only). We intentionally DO NOT map to any specific site/icon/href.
    if (Array.isArray(data.order)) {
      const migrated = data.order
        .map((id) => {
          const cleanId = (id ?? '').toString().trim()
          if (!cleanId) return null
          return { id: cleanId, label: cleanId, icon: '', href: '' }
        })
        .filter(Boolean)
      return { provider, openMode, shortcuts: normalizeShortcuts(migrated) }
    }

    return { provider, openMode, shortcuts: [] }
  } catch {
    return { ...DEFAULTS }
  }
}

function safeSave(state) {
  try {
    const payload = {
      provider: ALLOWED_PROVIDERS.has(state.provider) ? state.provider : DEFAULTS.provider,
      openMode: state.openMode === 'new' ? 'new' : DEFAULTS.openMode,
      // Persist only the user-defined data; keep it clean
      shortcuts: normalizeShortcuts(state.shortcuts),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // ignore write errors (private mode, quota, etc.)
  }
}

export const useShortcutsStore = defineStore('shortcuts', {
  state: () => ({
    ...safeLoad(),
    _hydrated: false, // subscribe once
  }),

  getters: {
    // Some parts of the app still expect an `order` (array of ids). Keep it derived.
    order: (state) => state.shortcuts.map((s) => s.id),
  },

  actions: {
    hydrate() {
      if (this._hydrated) return
      this._hydrated = true
      // Persist on any change
      this.$subscribe((_mutation, state) => {
        safeSave(state)
      })
    },

    // Search settings
    setProvider(v) {
      this.provider = ALLOWED_PROVIDERS.has(v) ? v : DEFAULTS.provider
    },
    setOpenMode(v) {
      this.openMode = v === 'new' ? 'new' : DEFAULTS.openMode
    },

    // ---- Shortcuts CRUD ----
    setShortcuts(list) {
      this.shortcuts = normalizeShortcuts(list)
    },

    upsertShortcut(item) {
      const [clean] = normalizeShortcuts([item])
      if (!clean) return
      const idx = this.shortcuts.findIndex((s) => s.id === clean.id)
      if (idx >= 0) this.shortcuts.splice(idx, 1, clean)
      else this.shortcuts.push(clean)
    },

    deleteShortcut(id) {
      const target = (id ?? '').toString().trim()
      if (!target) return
      this.shortcuts = this.shortcuts.filter((s) => s.id !== target)
    },

    // Back-compat: reorder using array of IDs
    setOrder(ids) {
      try {
        const byId = new Map(this.shortcuts.map((s) => [s.id, s]))
        const next = []
        for (const id of Array.isArray(ids) ? ids : []) {
          const item = byId.get(id)
          if (item) {
            next.push(item)
            byId.delete(id)
          }
        }
        // append leftovers in their current order
        for (const s of this.shortcuts) {
          if (byId.has(s.id)) {
            next.push(s)
            byId.delete(s.id)
          }
        }
        this.shortcuts = next
      } catch {
        // ignore
      }
    },

    reset() {
      Object.assign(this, {
        provider: DEFAULTS.provider,
        openMode: DEFAULTS.openMode,
        shortcuts: [],
      })
    },
  },
})
