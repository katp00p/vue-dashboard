// src/stores/shortcuts.js
import { defineStore } from 'pinia'

/**
 * Single source of truth for search settings + fully customizable shortcuts.
 * LocalStorage schema:
 * {
 *   provider: "Google" | "DuckDuckGo" | "Bing" | "Perplexity",
 *   openMode: "current" | "new",
 *   shortcuts: [{ id, label, icon, href }, ...]
 * }
 */

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
  openMode: 'current',
  shortcuts: [],
}

/* ---------- helpers ---------- */

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

    if (!id) {
      if (!label) continue
      id =
        label
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '')
          .slice(0, 40) || 'item'
    }
    if (seen.has(id)) continue
    seen.add(id)

    if (!label) label = id
    out.push({ id, label, icon, href })
  }
  return out
}

function isCorruptedRaw(raw) {
  if (raw == null) return false // missing is handled separately
  const t = String(raw).trim()
  if (t === 'undefined' || t === 'null' || t === '') return true
  return !/^[{\[]/.test(t) // must look like JSON
}

function safeLoad() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (isCorruptedRaw(raw)) {
      // self-heal by clearing; hydrate() will re-save a clean state
      localStorage.removeItem(STORAGE_KEY)
      return { ...DEFAULTS }
    }
    if (!raw) return { ...DEFAULTS }

    const data = JSON.parse(raw) || {}
    const provider = ALLOWED_PROVIDERS.has(data.provider) ? data.provider : DEFAULTS.provider
    const openMode = data.openMode === 'new' ? 'new' : DEFAULTS.openMode

    if (Array.isArray(data.shortcuts)) {
      return { provider, openMode, shortcuts: normalizeShortcuts(data.shortcuts) }
    }

    // Legacy migration: order[] -> minimal objects (no icon/href defaults)
    if (Array.isArray(data.order)) {
      const migrated = data.order
        .map((id) => {
          const cleanId = (id ?? '').toString().trim()
          return cleanId ? { id: cleanId, label: cleanId, icon: '', href: '' } : null
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
      shortcuts: normalizeShortcuts(state.shortcuts),
    }
    // Never write the literal "undefined"
    let json = ''
    try {
      json = JSON.stringify(payload) || ''
    } catch {
      json = ''
    }
    if (!json) json = JSON.stringify({ ...DEFAULTS })
    localStorage.setItem(STORAGE_KEY, json)
  } catch {
    // ignore write errors (private mode, quota, etc.)
  }
}

/* ---------- store ---------- */

export const useShortcutsStore = defineStore('shortcuts', {
  state: () => ({
    ...safeLoad(),
    _hydrated: false,
  }),

  getters: {
    order: (state) => state.shortcuts.map((s) => s.id),
  },

  actions: {
    hydrate() {
      if (this._hydrated) return
      this._hydrated = true

      // Ensure the key exists (or gets repaired) immediately on hydrate
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        const missing = raw === null
        const corrupted = isCorruptedRaw(raw)
        if (missing || corrupted) {
          if (corrupted) localStorage.removeItem(STORAGE_KEY)
          safeSave(this.$state)
        }
      } catch {}

      // Persist every subsequent change
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

    // Shortcuts CRUD
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
      Object.assign(this, { ...DEFAULTS })
      // Write immediately so key is present after reset
      try {
        safeSave(this.$state)
      } catch {}
    },
  },
})
