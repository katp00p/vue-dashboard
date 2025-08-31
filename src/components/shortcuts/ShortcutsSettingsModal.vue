<!-- src/components/shortcuts/ShortcutsSettingsModal.vue -->
<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import SearchSettingsForm from './SearchSettingsForm.vue'
import ShortcutsManager from './ShortcutsManager.vue'
import { useShortcutsStore } from '@/stores/shortcuts'

/* v-model:open API */
const props = defineProps({ open: { type: Boolean, default: false } })
const emit = defineEmits(['update:open', 'save'])

/* Store bindings */
const shortcuts = useShortcutsStore()
shortcuts.hydrate()

// Normalize in case something passes lowercase values
const normalizeProvider = (v) => {
  if (!v) return v
  const map = { google: 'Google', duckduckgo: 'DuckDuckGo', bing: 'Bing', perplexity: 'Perplexity' }
  const key = String(v).toLowerCase()
  return map[key] || v
}

const provider = computed({
  get: () => shortcuts.provider,
  set: (v) => shortcuts.setProvider(normalizeProvider(v)),
})
const openMode = computed({
  get: () => shortcuts.openMode,
  set: (v) => shortcuts.setOpenMode(v),
})

/* A11y: focus trap + scroll lock */
const modalRef = ref(null)
const FOCUSABLE =
  'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function getFocusables() {
  const root = modalRef.value
  if (!root) return []
  return Array.from(root.querySelectorAll(FOCUSABLE)).filter(
    (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'),
  )
}

function openEffects() {
  document.documentElement.style.overflow = 'hidden'
  nextTick(() => {
    const [first] = getFocusables()
    if (first && typeof first.focus === 'function') first.focus()
  })
}
function closeEffects() {
  document.documentElement.style.overflow = ''
}

function closeModal() {
  emit('update:open', false)
}
function onOverlayClick(e) {
  if (e.target === e.currentTarget) closeModal()
}
function onKeydown(e) {
  if (!props.open) return
  if (e.key === 'Escape') {
    e.preventDefault()
    closeModal()
    return
  }
  if (e.key === 'Tab') {
    const focusables = getFocusables()
    if (!focusables.length) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const active = document.activeElement
    if (e.shiftKey) {
      if (active === first || !modalRef.value?.contains(active)) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (active === last || !modalRef.value?.contains(active)) {
        e.preventDefault()
        first.focus()
      }
    }
  }
}

watch(
  () => props.open,
  (v) => (v ? openEffects() : closeEffects()),
)
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.documentElement.style.overflow = ''
})

function onSave() {
  // Notify parent (keeps your existing flow)
  emit('save', { provider: provider.value, openMode: openMode.value })

  // Authoritative write so sanitized values win even if parent writes
  shortcuts.setProvider(provider.value)
  shortcuts.setOpenMode(openMode.value)

  // Backup write on nextTick if any deferred write occurs
  nextTick(() => {
    shortcuts.setProvider(provider.value)
    shortcuts.setOpenMode(openMode.value)
  })

  closeModal()
}
</script>

<template>
  <Teleport to="body">
    <div
      v-show="open"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
      id="shortcuts-settings"
      @click="onOverlayClick"
    >
      <!-- Panel -->
      <div
        ref="modalRef"
        class="w-full max-w-6xl max-h-[85vh] rounded-xl glass shadow-xl outline-none flex flex-col"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-white/10">
          <h2 id="settings-title" class="text-lg font-semibold text-slate-100 tracking-wide">
            Shortcuts & Search
          </h2>
        </div>

        <!-- Body -->
        <div class="p-6 space-y-8">
          <!-- Search settings (binds to Pinia store) -->
          <SearchSettingsForm v-model:provider="provider" v-model:openMode="openMode" />

          <!-- Shortcuts Manager (own component) -->
          <ShortcutsManager />
        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-white/10 flex items-center justify-end gap-2">
          <button
            type="button"
            class="px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40 text-sm"
            @click="closeModal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="px-3 py-2 rounded-md bg-white/10 text-slate-100 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-accent/40 text-sm"
            @click="onSave"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* no extra styles needed; Tailwind handles the visuals */
</style>
