// src/stores/shortcuts.js
import { defineStore } from 'pinia'

/**
 * Central store for search settings (and later: icon order/settings).
 * All LocalStorage I/O lives here.
 */

// Provider options: prefer Simple Icons via `si`, but Bing uses FA fallback icon.
export const PROVIDER_OPTIONS = [
  { value: 'Google', label: 'Google', si: 'google' },
  { value: 'DuckDuckGo', label: 'DuckDuckGo', si: 'duckduckgo' },
  { value: 'Bing', label: 'Bing', icon: 'fa-solid fa-b' }, // FA fallback for Bing
  { value: 'Perplexity', label: 'Perplexity', si: 'perplexity' },
]
const ALLOWED_PROVIDERS = new Set(PROVIDER_OPTIONS.map((o) => o.value))
const STORAGE_KEY = 'shortcuts.settings.v1'

// You can keep `order` as null until user customizes it. Later, parent can
// use this to arrange the rail (if null, use your default order).
const DEFAULTS = {
  provider: 'Google',
  openMode: 'current', // 'current' | 'new'
  order: null, // string[] | null
}

// --- helpers ---------------------------------------------------------------

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0
}

function sanitizeOrder(input) {
  if (!Array.isArray(input)) return DEFAULTS.order
  // unique, non-empty strings, trimmed; cap to something sane
  const seen = new Set()
  const out = []
  for (const v of input) {
    if (!isNonEmptyString(v)) continue
    const id = v.trim()
    if (seen.has(id)) continue
    seen.add(id)
    out.push(id)
    if (out.length >= 256) break
  }
  return out.length ? out : DEFAULTS.order
}

function sanitizeSnapshot(snapshot) {
  const provider = ALLOWED_PROVIDERS.has(snapshot?.provider) ? snapshot.provider : DEFAULTS.provider

  const openMode = snapshot?.openMode === 'new' ? 'new' : DEFAULTS.openMode

  const order = sanitizeOrder(snapshot?.order)

  return { provider, openMode, order }
}

function safeLoad() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULTS }

    const trimmed = String(raw).trim()
    if (!trimmed || trimmed === 'undefined' || trimmed === 'null') {
      return { ...DEFAULTS }
    }

    const parsed = JSON.parse(trimmed)
    return sanitizeSnapshot(parsed)
  } catch {
    return { ...DEFAULTS }
  }
}

function safeSave(stateLike) {
  try {
    const payload = sanitizeSnapshot(stateLike)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // ignore write errors (private mode, quota, etc.)
  }
}

// --- store -----------------------------------------------------------------

export const useShortcutsStore = defineStore('shortcuts', {
  state: () => ({
    ...safeLoad(),
    _hydrated: false, // internal guard so we subscribe once
  }),
  actions: {
    hydrate() {
      if (this._hydrated) return
      this._hydrated = true

      // Normalize whatever is currently in storage.
      safeSave(this.$state ?? this)

      // Persist on any subsequent change
      this.$subscribe((_mutation, state) => {
        safeSave(state)
      })
    },
    setProvider(v) {
      this.provider = ALLOWED_PROVIDERS.has(v) ? v : DEFAULTS.provider
      safeSave(this.$state ?? this)
    },
    setOpenMode(v) {
      this.openMode = v === 'new' ? 'new' : DEFAULTS.openMode
      safeSave(this.$state ?? this)
    },
    // NEW: save custom icon order (array of ids)
    setOrder(arr) {
      this.order = sanitizeOrder(arr)
      safeSave(this.$state ?? this)
    },
    reset() {
      Object.assign(this, { ...DEFAULTS })
      safeSave(this.$state ?? this)
    },
  },
})
