<!-- src/components/shortcuts/ShortcutsManager.vue -->
<script setup>
import { ref, computed, reactive, watch } from 'vue'
import { useShortcutsStore } from '@/stores/shortcuts'

const store = useShortcutsStore()
store.hydrate()

/* Config */
const MAX_SHORTCUTS = 39

/* List from store (single source of truth) */
const list = computed(() => (Array.isArray(store.shortcuts) ? store.shortcuts : []))
const count = computed(() => list.value.length)
const canAdd = computed(() => count.value < MAX_SHORTCUTS)

/* Selection */
const activeId = ref(list.value[0]?.id ?? null)
const activeItem = computed(() => list.value.find((s) => s.id === activeId.value) || null)

/* Favicon fallback (used when item.icon is empty) */
function faviconSrc(href) {
  try {
    if (!href) return null
    const host = new URL(href).hostname
    return host ? `https://www.google.com/s2/favicons?domain=${host}&sz=64` : null
  } catch {
    return null
  }
}

/* ---- HTML5 Drag & Drop (no deps) ---- */
let dragIndex = -1
function onDragStart(e, idx) {
  dragIndex = idx
  try {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(idx)) // required by some browsers
  } catch {}
}
function onDragOver(e) {
  e.preventDefault()
  try {
    e.dataTransfer.dropEffect = 'move'
  } catch {}
}
function onDrop(e, idx) {
  e.preventDefault()
  if (dragIndex < 0 || dragIndex === idx) {
    dragIndex = -1
    return
  }
  const next = list.value.slice()
  const [moved] = next.splice(dragIndex, 1)
  next.splice(idx, 0, moved)
  store.setShortcuts(next) // persists via store subscription
  dragIndex = -1
}
function onDragEnd() {
  dragIndex = -1
}

/* Delete */
function removeItem(id) {
  store.deleteShortcut(id) // persists via store subscription
  if (activeId.value === id) {
    const first = list.value[0]
    activeId.value = first ? first.id : null
  }
}

/* ---------- Adders ---------- */
function uniqueId(base = 'item') {
  const seed = (Date.now().toString(36) + Math.random().toString(36).slice(2, 6)).toLowerCase()
  let id = `${base}${seed}`
  const has = (x) => list.value.some((s) => s.id === x)
  while (has(id)) id = `${base}${seed}${Math.random().toString(36).slice(2, 4)}`
  return id
}

function addItem() {
  if (!canAdd.value) return
  const id = uniqueId('item')
  store.upsertShortcut({
    id,
    label: 'New Shortcut',
    href: '',
    icon: '',
  })
  activeId.value = id
}

function addDivider() {
  if (!canAdd.value) return
  const id = uniqueId('divider')
  // Default a simple visual; user can change in the form
  store.upsertShortcut({
    id,
    label: 'Divider',
    href: '',
    icon: 'fa-solid fa-grip-lines',
  })
  activeId.value = id
}

/* ---------- Editable form (debounced save) ---------- */
const form = reactive({ id: '', label: '', href: '', icon: '' })

function loadFormFromActive() {
  const s = activeItem.value
  form.id = s?.id || ''
  form.label = s?.label || ''
  form.href = s?.href || ''
  form.icon = s?.icon || ''
}

/* Init + keep form in sync when selection changes */
watch(activeId, loadFormFromActive, { immediate: true })

/* If list changes (add/remove/reorder), keep selection sane */
watch(list, (nv) => {
  if (!nv?.length) {
    activeId.value = null
    loadFormFromActive()
    return
  }
  if (!nv.find((s) => s.id === activeId.value)) activeId.value = nv[0].id
  loadFormFromActive()
})

/* Save with debounce to avoid noisy writes */
let saveTimer = null
function scheduleSave() {
  clearTimeout(saveTimer)
  saveTimer = setTimeout(applyChanges, 250)
}
function applyChanges() {
  if (!form.id) return
  store.upsertShortcut({
    id: form.id,
    label: form.label,
    href: form.href,
    icon: form.icon,
  })
}
</script>

<template>
  <section class="space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="text-sm font-medium text-slate-200">Shortcuts Manager</h3>

      <div class="flex items-center gap-3">
        <span class="text-xs text-slate-400">{{ count }} / {{ MAX_SHORTCUTS }}</span>

        <button
          type="button"
          :disabled="!canAdd"
          class="px-3 py-2 rounded-md bg-white/10 text-slate-100 border border-white/15 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400/40 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          :title="canAdd ? 'Add a new icon' : 'Maximum of 39 items reached'"
          @click="addItem"
        >
          Add Icon
        </button>

        <button
          type="button"
          :disabled="!canAdd"
          class="px-3 py-2 rounded-md bg-white/10 text-slate-100 border border-white/15 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400/40 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          :title="canAdd ? 'Add a divider' : 'Maximum of 39 items reached'"
          @click="addDivider"
        >
          Add Divider
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Left: Order list -->
      <div class="bg-white/5 rounded-md p-4 space-y-2">
        <p class="text-xs uppercase text-slate-400 mb-2">Icon Order</p>

        <div v-if="list.length" class="flex flex-col gap-2 max-h-[50vh] overflow-y-auto pr-1">
          <div
            v-for="(item, idx) in list"
            :key="item.id"
            class="flex items-center gap-3 p-2 bg-white/10 rounded text-left hover:bg-white/15 focus:outline-none cursor-move select-none"
            :class="activeId === item.id ? 'ring-2 ring-[#949ba1]' : ''"
            draggable="true"
            @dragstart="onDragStart($event, idx)"
            @dragover="onDragOver($event)"
            @drop="onDrop($event, idx)"
            @dragend="onDragEnd"
            @click="activeId = item.id"
          >
            <!-- Icon preview -->
            <span class="h-6 w-6 flex items-center justify-center flex-shrink-0">
              <i v-if="item.icon" :class="item.icon + ' text-xl leading-none'"></i>
              <img
                v-else-if="faviconSrc(item.href)"
                :src="faviconSrc(item.href)"
                alt=""
                class="w-5 h-5 rounded-sm"
                draggable="false"
              />
              <i v-else class="fa-regular fa-circle text-base opacity-60"></i>
            </span>

            <span class="text-slate-200 text-sm truncate">{{ item.label || item.id }}</span>

            <!-- Gray "X" icon button -->
            <button
              type="button"
              class="ml-auto h-8 w-8 flex items-center justify-center rounded hover:bg-white/10 text-slate-400 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
              @click.stop="removeItem(item.id)"
              aria-label="Delete"
              title="Delete"
            >
              <i class="fa-solid fa-xmark text-base leading-none"></i>
            </button>
          </div>
        </div>

        <div v-else class="text-sm text-slate-400 flex items-center justify-center h-24">
          No shortcuts yet. Click “Add Icon” or “Add Divider” to create one.
        </div>
      </div>

      <!-- Right: Icon Details (editable) -->
      <div class="bg-white/5 rounded-md p-4 flex flex-col">
        <p class="text-xs uppercase text-slate-400 mb-2">Icon Details</p>

        <div v-if="activeItem" class="flex flex-col gap-4">
          <!-- Live preview -->
          <div class="flex items-center gap-3">
            <span class="h-8 w-8 flex items-center justify-center bg-white/10 rounded">
              <i v-if="form.icon" :class="form.icon + ' text-2xl leading-none'"></i>
              <img
                v-else-if="faviconSrc(form.href)"
                :src="faviconSrc(form.href)"
                alt=""
                class="w-6 h-6 rounded-sm"
                draggable="false"
              />
              <i v-else class="fa-regular fa-circle text-lg opacity-60"></i>
            </span>
            <span class="text-slate-300 text-sm">Preview</span>
          </div>

          <!-- Label -->
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Label</label>
            <input
              v-model="form.label"
              type="text"
              class="control w-full text-sm rounded-md bg-[#4b535a] text-slate-100 border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-white/20"
              placeholder="e.g., My App"
              autocomplete="off"
              @input="scheduleSave"
            />
          </div>

          <!-- Link -->
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Link</label>
            <input
              v-model="form.href"
              type="url"
              class="control w-full text-sm rounded-md bg-[#4b535a] text-slate-100 border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-white/20"
              placeholder="https://example.com"
              autocomplete="off"
              @input="scheduleSave"
            />
          </div>

          <!-- Icon Class (Font Awesome classes) -->
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Icon Class</label>
            <input
              v-model="form.icon"
              type="text"
              class="control w-full text-sm rounded-md bg-[#4b535a] text-slate-100 border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-white/20"
              placeholder="fa-brands fa-github"
              autocomplete="off"
              @input="scheduleSave"
            />
            <p class="text-xs text-slate-400 mt-1">
              Tip: paste any Font Awesome class (e.g., <code>fa-solid fa-robot</code>). If left
              blank, we’ll show the site favicon from the link (when available).
            </p>
          </div>
        </div>

        <div v-else class="text-sm text-slate-400 flex-1 flex items-center justify-center">
          Select an item from the left to edit its settings.
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* none */
</style>

<!-- Unscoped: make text selection visible inside the settings modal only -->
<style>
/* Selection color for any text selected within the modal (inputs, text, etc.) */
#shortcuts-settings ::selection,
#shortcuts-settings input::selection,
#shortcuts-settings textarea::selection {
  background: rgba(99, 179, 237, 0.35); /* approx Tailwind sky-400 @ 35% */
  color: #ffffff;
}
#shortcuts-settings ::-moz-selection,
#shortcuts-settings input::-moz-selection,
#shortcuts-settings textarea::-moz-selection {
  background: rgba(99, 179, 237, 0.35);
  color: #ffffff;
}
</style>
