<!-- src/components/shortcuts/ShortcutsManager.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { Switch } from '@headlessui/vue'
import { useShortcutsStore } from '@/stores/shortcuts'

/**
 * Optional props:
 * - shortcuts: parent-provided list (else we use an internal list)
 * - showDragHandle: if true, shows the 6-dot handle; default false
 */
const props = defineProps({
  shortcuts: { type: Array, default: null },
  showDragHandle: { type: Boolean, default: false },
})
const emit = defineEmits(['update:shortcuts'])

/* Pinia store for persisting order */
const store = useShortcutsStore()
onMounted(() => store.hydrate())

/* Local list (falls back to internal defaults) */
const internalShortcuts = ref(
  props.shortcuts
    ? [...props.shortcuts]
    : [
        {
          id: 'youtube',
          label: 'YouTube',
          icon: 'fa-brands fa-youtube',
          href: 'https://www.youtube.com',
        },
        { id: 'github', label: 'GitHub', icon: 'fa-brands fa-github', href: 'https://github.com' },
        {
          id: 'gmail',
          label: 'Gmail',
          icon: 'fa-regular fa-envelope',
          href: 'https://mail.google.com',
        },
        {
          id: 'gdrive',
          label: 'Google Drive',
          icon: 'fa-brands fa-google-drive',
          href: 'https://drive.google.com',
        },
        {
          id: 'chatgpt',
          label: 'ChatGPT',
          icon: 'fa-solid fa-robot',
          href: 'https://chat.openai.com',
        },
        {
          id: 'twitter',
          label: 'Twitter',
          icon: 'fa-brands fa-x-twitter',
          href: 'https://twitter.com',
        },
        {
          id: 'reddit',
          label: 'Reddit',
          icon: 'fa-brands fa-reddit-alien',
          href: 'https://reddit.com',
        },
        {
          id: 'linkedin',
          label: 'LinkedIn',
          icon: 'fa-brands fa-linkedin',
          href: 'https://linkedin.com',
        },
        {
          id: 'steam',
          label: 'Steam',
          icon: 'fa-brands fa-steam',
          href: 'https://store.steampowered.com',
        },
        {
          id: 'spotify',
          label: 'Spotify',
          icon: 'fa-brands fa-spotify',
          href: 'https://spotify.com',
        },
        {
          id: 'facebook',
          label: 'Facebook',
          icon: 'fa-brands fa-facebook',
          href: 'https://facebook.com',
        },
        {
          id: 'instagram',
          label: 'Instagram',
          icon: 'fa-brands fa-instagram',
          href: 'https://instagram.com',
        },
        { id: 'tiktok', label: 'TikTok', icon: 'fa-brands fa-tiktok', href: 'https://tiktok.com' },
        {
          id: 'whatsapp',
          label: 'WhatsApp',
          icon: 'fa-brands fa-whatsapp',
          href: 'https://whatsapp.com',
        },
        {
          id: 'discord',
          label: 'Discord',
          icon: 'fa-brands fa-discord',
          href: 'https://discord.com',
        },
        { id: 'amazon', label: 'Amazon', icon: 'fa-brands fa-amazon', href: 'https://amazon.com' },
        { id: 'netflix', label: 'Netflix', icon: 'fa-solid fa-n', href: 'https://netflix.com' },
        { id: 'openai', label: 'OpenAI', icon: 'fa-solid fa-brain', href: 'https://openai.com' },
        {
          id: 'pinterest',
          label: 'Pinterest',
          icon: 'fa-brands fa-pinterest',
          href: 'https://pinterest.com',
        },
        { id: 'apple', label: 'Apple', icon: 'fa-brands fa-apple', href: 'https://apple.com' },
        {
          id: 'microsoft',
          label: 'Microsoft',
          icon: 'fa-brands fa-microsoft',
          href: 'https://microsoft.com',
        },
        { id: 'slack', label: 'Slack', icon: 'fa-brands fa-slack', href: 'https://slack.com' },
        {
          id: 'asana',
          label: 'Asana',
          icon: 'fa-solid fa-diagram-project',
          href: 'https://asana.com',
        },
        { id: 'figma', label: 'Figma', icon: 'fa-brands fa-figma', href: 'https://figma.com' },
        {
          id: 'dribbble',
          label: 'Dribbble',
          icon: 'fa-brands fa-dribbble',
          href: 'https://dribbble.com',
        },
        {
          id: 'behance',
          label: 'Behance',
          icon: 'fa-brands fa-behance',
          href: 'https://behance.net',
        },
        { id: 'trello', label: 'Trello', icon: 'fa-brands fa-trello', href: 'https://trello.com' },
        {
          id: 'notion',
          label: 'Notion',
          icon: 'fa-regular fa-file-lines',
          href: 'https://notion.so',
        },
        { id: 'medium', label: 'Medium', icon: 'fa-brands fa-medium', href: 'https://medium.com' },
        {
          id: 'hn',
          label: 'Hacker News',
          icon: 'fa-solid fa-newspaper',
          href: 'https://news.ycombinator.com',
        },
        { id: 'bbc', label: 'BBC', icon: 'fa-solid fa-globe', href: 'https://bbc.com' },
        { id: 'cnn', label: 'CNN', icon: 'fa-solid fa-tv', href: 'https://cnn.com' },
        {
          id: 'nyt',
          label: 'NY Times',
          icon: 'fa-regular fa-newspaper',
          href: 'https://nytimes.com',
        },
        {
          id: 'wapo',
          label: 'Washington Post',
          icon: 'fa-solid fa-scroll',
          href: 'https://washingtonpost.com',
        },
        {
          id: 'bloomberg',
          label: 'Bloomberg',
          icon: 'fa-solid fa-chart-line',
          href: 'https://bloomberg.com',
        },
        {
          id: 'crypto',
          label: 'Crypto',
          icon: 'fa-solid fa-coins',
          href: 'https://coinmarketcap.com',
        },
        {
          id: 'weather',
          label: 'Weather',
          icon: 'fa-solid fa-cloud-sun',
          href: 'https://weather.com',
        },
        {
          id: 'calendar',
          label: 'Calendar',
          icon: 'fa-regular fa-calendar',
          href: 'https://calendar.google.com',
        },
        { id: 'maps', label: 'Maps', icon: 'fa-solid fa-map', href: 'https://maps.google.com' },
        {
          id: 'photos',
          label: 'Photos',
          icon: 'fa-regular fa-image',
          href: 'https://photos.google.com',
        },
      ],
)

/* Writable computed so a parent can v-model later if desired */
const shortcutsList = computed({
  get: () => internalShortcuts.value,
  set: (val) => {
    internalShortcuts.value = val
    emit('update:shortcuts', val)
  },
})

/* selection + editing state */
const activeIconId = ref(shortcutsList.value[0]?.id || 'youtube')
const activeIcon = computed(
  () => shortcutsList.value.find((s) => s.id === activeIconId.value) ?? null,
)
const activeIconActive = ref(true)
const confirmDelete = ref(false)

/* Persist current order to store */
function persistOrder() {
  try {
    const ids = shortcutsList.value.map((s) => s.id)
    store.setOrder(ids)
  } catch (err) {
    void err
  }
}

/* ---------------- Drag & Drop state/logic (native HTML5) ---------------- */
const draggingId = ref(null)
const dragOverId = ref(null)
const dropPos = ref(null) // 'above' | 'below'

function indexById(id) {
  return shortcutsList.value.findIndex((s) => s.id === id)
}
function moveItem(arr, from, to) {
  const copy = [...arr]
  const [item] = copy.splice(from, 1)
  copy.splice(to, 0, item)
  return copy
}

function onDragStart(item, e) {
  draggingId.value = item.id
  dragOverId.value = null
  dropPos.value = null
  if (e?.dataTransfer && typeof e.dataTransfer.setData === 'function') {
    try {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', item.id)
    } catch (err) {
      void err
    }
  }
}
function onDragOver(item, e) {
  e.preventDefault()
  if (e?.dataTransfer) {
    try {
      e.dataTransfer.dropEffect = 'move'
    } catch (err) {
      void err
    }
  }
  const rect = e.currentTarget.getBoundingClientRect()
  const y = e.clientY
  dropPos.value = y < rect.top + rect.height / 2 ? 'above' : 'below'
  dragOverId.value = item.id
}
function onDragEnter(item, e) {
  onDragOver(item, e)
}
function onDrop(item, e) {
  e.preventDefault()
  const fromIdx = indexById(draggingId.value)
  const overIdx = indexById(item.id)
  if (fromIdx === -1 || overIdx === -1) return

  let insertIdx = overIdx + (dropPos.value === 'below' ? 1 : 0)
  if (fromIdx < insertIdx) insertIdx--

  if (fromIdx !== insertIdx) {
    shortcutsList.value = moveItem(shortcutsList.value, fromIdx, insertIdx)
    persistOrder() // <-- save to store
  }

  activeIconId.value = draggingId.value
  draggingId.value = null
  dragOverId.value = null
  dropPos.value = null
}
function onDragEnd() {
  draggingId.value = null
  dragOverId.value = null
  dropPos.value = null
}

/* actions */
function deleteActive() {
  const idx = shortcutsList.value.findIndex((s) => s.id === activeIconId.value)
  if (idx === -1) return (confirmDelete.value = false)
  const nextId = shortcutsList.value[idx + 1]?.id || shortcutsList.value[idx - 1]?.id || null
  shortcutsList.value = shortcutsList.value.filter((_, i) => i !== idx)
  activeIconId.value = nextId
  confirmDelete.value = false
  persistOrder() // keep store in sync when list changes
}
</script>

<template>
  <section class="space-y-3">
    <h3 class="text-sm font-medium text-slate-200">Shortcuts Manager</h3>

    <div class="flex items-center justify-between">
      <p class="text-sm text-slate-400">
        Drag icons in the left column to change order. Click an icon to edit its settings in the
        right panel.
      </p>

      <button
        type="button"
        disabled
        class="px-3 py-2 rounded-md bg-white/10 text-slate-100 border border-white/15 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400/40 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        title="Maximum of 39 icons reached"
      >
        Add Icon
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Left: Icon Order (draggable list) -->
      <div class="bg-white/5 rounded-md p-4 space-y-2">
        <p class="text-xs uppercase text-slate-400 mb-2">Icon Order</p>
        <div class="flex flex-col gap-2 max-h-[50vh] overflow-y-auto pr-1">
          <button
            v-for="item in shortcutsList"
            :key="item.id"
            type="button"
            class="group flex items-center gap-3 p-2 bg-white/10 rounded text-left hover:bg-white/15 focus:outline-none select-none cursor-grab active:cursor-grabbing"
            :class="[
              activeIconId === item.id ? 'ring-2 ring-[#949ba1]' : '',
              draggingId === item.id ? 'opacity-60' : '',
              dragOverId === item.id && dropPos === 'above'
                ? 'border-t-2 border-[#949ba1] -mt-[2px]'
                : '',
              dragOverId === item.id && dropPos === 'below'
                ? 'border-b-2 border-[#949ba1] -mb-[2px]'
                : '',
            ]"
            draggable="true"
            @dragstart="onDragStart(item, $event)"
            @dragover="onDragOver(item, $event)"
            @dragenter="onDragEnter(item, $event)"
            @drop="onDrop(item, $event)"
            @dragend="onDragEnd"
            @click="activeIconId = item.id"
            :aria-grabbed="draggingId === item.id ? 'true' : 'false'"
          >
            <!-- Optional drag handle (off by default) -->
            <i v-if="showDragHandle" class="fa-solid fa-grip-vertical opacity-60"></i>

            <i :class="item.icon + ' text-xl'"></i>
            <span class="text-slate-200 text-sm truncate flex-1">{{ item.label }}</span>
          </button>
        </div>
      </div>

      <!-- Right: Icon Settings -->
      <div class="bg-white/5 rounded-md p-4 flex flex-col">
        <p class="text-xs uppercase text-slate-400 mb-2">Icon Settings</p>

        <div v-if="activeIcon" class="flex flex-col gap-4 flex-1">
          <!-- Toggle -->
          <div class="flex flex-col gap-1">
            <span class="block text-xs font-medium text-slate-300">Icon Active</span>
            <div class="flex items-center gap-3">
              <Switch
                v-model="activeIconActive"
                :class="[
                  activeIconActive ? 'bg-[#2c476d]' : 'bg-gray-600',
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                ]"
              >
                <span
                  :class="[
                    activeIconActive ? 'translate-x-6' : 'translate-x-1',
                    'inline-block h-4 w-4 transform rounded-full bg-white transition',
                  ]"
                ></span>
              </Switch>
              <span class="text-sm text-slate-100 font-normal">Icon Inactive</span>
            </div>
          </div>

          <!-- Label -->
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Label</label>
            <input
              v-model="activeIcon.label"
              type="text"
              class="control w-full text-sm rounded-md bg-[#4b535a] text-slate-100 border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-white/20"
              placeholder="e.g., Facebook"
              autocomplete="off"
            />
          </div>

          <!-- Link -->
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Link</label>
            <input
              v-model="activeIcon.href"
              type="url"
              class="control w-full text-sm rounded-md bg-[#4b535a] text-slate-100 border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-white/20"
              placeholder="https://facebook.com"
              autocomplete="off"
            />
          </div>

          <!-- Icon Class -->
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Icon Class</label>
            <input
              v-model="activeIcon.icon"
              type="text"
              class="control w-full text-sm rounded-md bg-[#4b535a] text-slate-100 border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-white/20"
              placeholder="fa-brands fa-facebook"
              autocomplete="off"
            />
          </div>

          <!-- Delete Widget pinned bottom -->
          <div class="mt-auto rounded-md border border-white/10 bg-white/5 p-4">
            <p class="text-sm text-slate-200">Delete this icon?</p>

            <div v-if="!confirmDelete" class="mt-1 flex items-center justify-between gap-4">
              <p class="text-[13px] leading-5 text-slate-400 flex-1">
                This will remove the icon from your shortcuts.
              </p>
              <button
                type="button"
                class="px-3 py-2 rounded-md bg-[#553744] text-slate-100 border border-white/10 hover:bg-[#6a4756] focus:outline-none focus:ring-2 focus:ring-sky-400/40 text-sm shrink-0"
                @click="confirmDelete = true"
              >
                Delete
              </button>
            </div>

            <div v-else class="mt-1 flex items-center justify-between gap-4">
              <p class="text-sm text-slate-200 flex-1">Are you sure?</p>
              <div class="flex gap-2 shrink-0">
                <button
                  type="button"
                  class="px-3 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400/40 text-sm"
                  @click="confirmDelete = false"
                >
                  No
                </button>
                <button
                  type="button"
                  class="px-3 py-2 rounded-md bg-[#553744] text-slate-100 border border-white/10 hover:bg-[#6a4756] focus:outline-none focus:ring-2 focus:ring-sky-400/40 text-sm"
                  @click="deleteActive"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-sm text-slate-400 flex-1 flex items-center justify-center">
          Select an icon from the left to edit its settings.
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* No extra styles; utility classes handle drag visuals. */
</style>
