// src/stores/shortcuts.js
import { defineStore } from 'pinia'

/**
 * Central store for search settings (and later: icon order/settings).
 * All LocalStorage I/O lives here.
 */

export const PROVIDER_OPTIONS = [
  { value: 'Google',      label: 'Google',      icon: 'fa-brands fa-google' },
  { value: 'DuckDuckGo',  label: 'DuckDuckGo',  icon: 'fa-solid fa-magnifying-glass' },
  { value: 'Bing',        label: 'Bing',        icon: 'fa-brands fa-microsoft' },
  { value: 'Perplexity',  label: 'Perplexity',  icon: 'fa-solid fa-magnifying-glass' }
]
const ALLOWED_PROVIDERS = new Set(PROVIDER_OPTIONS.map(o => o.value))
const STORAGE_KEY = 'shortcuts.settings.v1'

const DEFAULTS = {
  provider: 'Google',
  openMode: 'current' // 'current' | 'new'
}

function safeLoad() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULTS }
    const data = JSON.parse(raw)
    const provider = ALLOWED_PROVIDERS.has(data.provider) ? data.provider : DEFAULTS.provider
    const openMode = data.openMode === 'new' ? 'new' : DEFAULTS.openMode
    return { provider, openMode }
  } catch {
    return { ...DEFAULTS }
  }
}

function safeSave(state) {
  try {
    const payload = {
      provider: state.provider,
      openMode: state.openMode
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // ignore write errors (private mode, quota, etc.)
  }
}

export const useShortcutsStore = defineStore('shortcuts', {
  state: () => ({
    ...safeLoad(),
    _hydrated: false // internal guard so we subscribe once
  }),
  actions: {
    hydrate() {
      if (this._hydrated) return
      // state already initialized from storage in state()
      this._hydrated = true
      // Persist on any change
      this.$subscribe((_mutation, state) => {
        safeSave(state)
      })
    },
    setProvider(v) {
      this.provider = ALLOWED_PROVIDERS.has(v) ? v : DEFAULTS.provider
    },
    setOpenMode(v) {
      this.openMode = v === 'new' ? 'new' : DEFAULTS.openMode
    },
    reset() {
      Object.assign(this, { ...DEFAULTS })
    }
  }
})
