<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import { Switch } from '@headlessui/vue'
import SearchSettingsForm from './SearchSettingsForm.vue'

/* refs for palette sync */
const sampleInputRef = ref(null)
const modalRef = ref(null)
const confirmDelete = ref(false)

function syncUiSelectPalette() {
    const el = sampleInputRef.value
    const root = modalRef.value
    if (!el || !root) return
    const cs = getComputedStyle(el)
    const bg = cs.backgroundColor || '#2c3440'
    const border = cs.borderColor || '#3f4756'
    root.style.setProperty('--control-bg', bg)
    root.style.setProperty('--control-border', border)
}

watch(() => open, (v) => {
    if (v) nextTick(syncUiSelectPalette)
})

/* search settings (top form) */
const provider = ref('ChatGPT')
const openMode = ref('current') // 'current' | 'new'

/* v-model:open API */
const props = defineProps({ open: { type: Boolean, default: false } })
const emit = defineEmits(['update:open', 'save'])

/* modal state */
const activeIconId = ref('youtube')

/* mock shortcuts (mirrors your rail, gear excluded) */
const shortcuts = ref([
    { id: 'youtube', label: 'YouTube', icon: 'fa-brands fa-youtube', href: 'https://www.youtube.com' },
    { id: 'github', label: 'GitHub', icon: 'fa-brands fa-github', href: 'https://github.com' },
    { id: 'gmail', label: 'Gmail', icon: 'fa-regular fa-envelope', href: 'https://mail.google.com' },
    { id: 'gdrive', label: 'Google Drive', icon: 'fa-brands fa-google-drive', href: 'https://drive.google.com' },
    { id: 'chatgpt', label: 'ChatGPT', icon: 'fa-solid fa-robot', href: 'https://chat.openai.com' },
    { id: 'twitter', label: 'Twitter', icon: 'fa-brands fa-x-twitter', href: 'https://twitter.com' },
    { id: 'reddit', label: 'Reddit', icon: 'fa-brands fa-reddit-alien', href: 'https://reddit.com' },
    { id: 'linkedin', label: 'LinkedIn', icon: 'fa-brands fa-linkedin', href: 'https://linkedin.com' },
    { id: 'steam', label: 'Steam', icon: 'fa-brands fa-steam', href: 'https://store.steampowered.com' },
    { id: 'spotify', label: 'Spotify', icon: 'fa-brands fa-spotify', href: 'https://spotify.com' },
    { id: 'facebook', label: 'Facebook', icon: 'fa-brands fa-facebook', href: 'https://facebook.com' },
    { id: 'instagram', label: 'Instagram', icon: 'fa-brands fa-instagram', href: 'https://instagram.com' },
    { id: 'tiktok', label: 'TikTok', icon: 'fa-brands fa-tiktok', href: 'https://tiktok.com' },
    { id: 'whatsapp', label: 'WhatsApp', icon: 'fa-brands fa-whatsapp', href: 'https://whatsapp.com' },
    { id: 'discord', label: 'Discord', icon: 'fa-brands fa-discord', href: 'https://discord.com' },
    { id: 'amazon', label: 'Amazon', icon: 'fa-brands fa-amazon', href: 'https://amazon.com' },
    { id: 'netflix', label: 'Netflix', icon: 'fa-solid fa-n', href: 'https://netflix.com' },
    { id: 'openai', label: 'OpenAI', icon: 'fa-solid fa-brain', href: 'https://openai.com' },
    { id: 'pinterest', label: 'Pinterest', icon: 'fa-brands fa-pinterest', href: 'https://pinterest.com' },
    { id: 'apple', label: 'Apple', icon: 'fa-brands fa-apple', href: 'https://apple.com' },
    { id: 'microsoft', label: 'Microsoft', icon: 'fa-brands fa-microsoft', href: 'https://microsoft.com' },
    { id: 'slack', label: 'Slack', icon: 'fa-brands fa-slack', href: 'https://slack.com' },
    { id: 'asana', label: 'Asana', icon: 'fa-solid fa-diagram-project', href: 'https://asana.com' },
    { id: 'figma', label: 'Figma', icon: 'fa-brands fa-figma', href: 'https://figma.com' },
    { id: 'dribbble', label: 'Dribbble', icon: 'fa-brands fa-dribbble', href: 'https://dribbble.com' },
    { id: 'behance', label: 'Behance', icon: 'fa-brands fa-behance', href: 'https://behance.net' },
    { id: 'trello', label: 'Trello', icon: 'fa-brands fa-trello', href: 'https://trello.com' },
    { id: 'notion', label: 'Notion', icon: 'fa-regular fa-file-lines', href: 'https://notion.so' },
    { id: 'medium', label: 'Medium', icon: 'fa-brands fa-medium', href: 'https://medium.com' },
    { id: 'hn', label: 'Hacker News', icon: 'fa-solid fa-newspaper', href: 'https://news.ycombinator.com' },
    { id: 'bbc', label: 'BBC', icon: 'fa-solid fa-globe', href: 'https://bbc.com' },
    { id: 'cnn', label: 'CNN', icon: 'fa-solid fa-tv', href: 'https://cnn.com' },
    { id: 'nyt', label: 'NY Times', icon: 'fa-regular fa-newspaper', href: 'https://nytimes.com' },
    { id: 'wapo', label: 'Washington Post', icon: 'fa-solid fa-scroll', href: 'https://washingtonpost.com' },
    { id: 'bloomberg', label: 'Bloomberg', icon: 'fa-solid fa-chart-line', href: 'https://bloomberg.com' },
    { id: 'crypto', label: 'Crypto', icon: 'fa-solid fa-coins', href: 'https://coinmarketcap.com' },
    { id: 'weather', label: 'Weather', icon: 'fa-solid fa-cloud-sun', href: 'https://weather.com' },
    { id: 'calendar', label: 'Calendar', icon: 'fa-regular fa-calendar', href: 'https://calendar.google.com' },
    { id: 'maps', label: 'Maps', icon: 'fa-solid fa-map', href: 'https://maps.google.com' },
    { id: 'photos', label: 'Photos', icon: 'fa-regular fa-image', href: 'https://photos.google.com' },
])

/* computed: selected icon object */
const activeIcon = computed(() => {
    return shortcuts.value.find(s => s.id === activeIconId.value) ?? null
})

/* Headless UI switch state (visual only for now) */
const activeIconActive = ref(true)

/* A11y: focus trap + scroll lock */
const FOCUSABLE =
    'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function getFocusables() {
    const root = modalRef.value
    if (!root) return []
    return Array.from(root.querySelectorAll(FOCUSABLE)).filter(
        (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
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

watch(() => props.open, (v) => (v ? openEffects() : closeEffects()))
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
    document.documentElement.style.overflow = ''
})

function onSave() {
    emit('save')
    closeModal()
}
</script>

<template>
    <Teleport to="body">
        <div v-show="open" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="settings-title" id="shortcuts-settings" @click="onOverlayClick">
            <!-- Panel -->
            <div ref="modalRef" class="w-full max-w-6xl max-h-[85vh] rounded-xl glass shadow-xl outline-none flex flex-col">
                <!-- Header -->
                <div class="flex items-center justify-between p-4 border-b border-white/10">
                    <h2 id="settings-title" class="text-lg font-semibold text-slate-100 tracking-wide">
                        Shortcuts & Search
                    </h2>
                </div>

                <!-- Body -->
                <div class="p-6 space-y-8">
                    <SearchSettingsForm v-model:provider="provider" v-model:openMode="openMode" />

                    <!-- Shortcuts Manager -->
                    <section class="space-y-3">
                        <h3 class="text-sm font-medium text-slate-200">Shortcuts Manager</h3>
                        <p class="text-sm text-slate-400">
                            Drag icons in the left column to change order. Click an icon to
                            edit its settings in the right panel.
                        </p>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Left: Icon Order (only this scrolls) -->
                            <div class="bg-white/5 rounded-md p-4 space-y-2">
                                <p class="text-xs uppercase text-slate-400 mb-2">Icon Order</p>
                                <div class="flex flex-col gap-2 max-h-[50vh] overflow-y-auto pr-1">
                                    <button v-for="item in shortcuts" :key="item.id" type="button" class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move text-left hover:bg-white/15 focus:outline-none" :class="activeIconId === item.id
                                        ? 'ring-2 ring-[#949ba1]'
                                        : ''
                                        " @click="activeIconId = item.id">
                                        <i :class="item.icon + ' text-xl'"></i>
                                        <span class="text-slate-200 text-sm">{{ item.label }}</span>
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
                                            <Switch v-model="activeIconActive" :class="[
                                                activeIconActive ? 'bg-[#2c476d]' : 'bg-gray-600',
                                                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors'
                                            ]">
                                                <span :class="[
                                                    activeIconActive ? 'translate-x-6' : 'translate-x-1',
                                                    'inline-block h-4 w-4 transform rounded-full bg-white transition'
                                                ]"></span>
                                            </Switch>
                                            <span class="text-sm text-slate-100 font-normal">Icon Inactive</span>
                                        </div>
                                    </div>

                                    <!-- Label -->
                                    <div>
                                        <label class="block text-xs font-medium text-slate-300 mb-1">Label</label>
                                        <input v-model="activeIcon.label" type="text" class="control w-full text-sm rounded-md bg-[#4b535a] text-slate-100
               border border-white/10 focus:outline-none
               focus:ring-2 focus:ring-sky-400/40 focus:border-white/20" placeholder="e.g., Facebook" autocomplete="off" />
                                    </div>

                                    <!-- Link -->
                                    <div>
                                        <label class="block text-xs font-medium text-slate-300 mb-1">Link</label>
                                        <input v-model="activeIcon.href" type="url" class="control w-full text-sm rounded-md bg-[#4b535a] text-slate-100
               border border-white/10 focus:outline-none
               focus:ring-2 focus:ring-sky-400/40 focus:border-white/20" placeholder="https://facebook.com" autocomplete="off" />
                                    </div>

                                    <!-- Icon Class -->
                                    <div>
                                        <label class="block text-xs font-medium text-slate-300 mb-1">Icon Class</label>
                                        <input v-model="activeIcon.icon" type="text" class="control w-full text-sm rounded-md bg-[#4b535a] text-slate-100
               border border-white/10 focus:outline-none
               focus:ring-2 focus:ring-sky-400/40 focus:border-white/20" placeholder="fa-brands fa-facebook" autocomplete="off" />
                                    </div>

                                    <!-- Delete Widget pinned bottom -->
                                    <div class="mt-auto rounded-md border border-white/10 bg-white/5 p-4">
                                        <p class="text-sm text-slate-200 mb-2">Delete this icon?</p>

                                        <!-- Small text -->
                                        <p class="text-[13px] text-slate-400">
                                            {{ confirmDelete ? 'Are you sure?' : 'This will remove the icon from your shortcuts.' }}
                                        </p>

                                        <!-- Buttons (right-aligned) -->
                                        <div class="mt-2 flex justify-end gap-2">
                                            <template v-if="confirmDelete">
                                                <button type="button" class="px-3 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700
                   focus:outline-none focus:ring-2 focus:ring-gray-400/40 text-sm" @click="confirmDelete = false">
                                                    No
                                                </button>
                                                <button type="button" class="px-3 py-2 rounded-md bg-[#553744] text-slate-100
         border border-white/10 hover:bg-[#6a4756]
         focus:outline-none focus:ring-2 focus:ring-sky-400/40 text-sm" @click="/* later: real delete */ confirmDelete = false">
                                                    Yes
                                                </button>
                                            </template>
                                            <template v-else>
                                                <button type="button" class="px-3 py-2 rounded-md bg-[#553744] text-slate-100 border border-white/10
                   hover:bg-[#6a4756] focus:outline-none focus:ring-2 focus:ring-sky-400/40 text-sm" @click="confirmDelete = true">
                                                    Delete
                                                </button>
                                            </template>
                                        </div>
                                    </div>
                                </div>

                                <div v-else class="text-sm text-slate-400 flex-1 flex items-center justify-center">
                                    Select an icon from the left to edit its settings.
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- Footer -->
                <div class="p-4 border-t border-white/10 flex items-center justify-end gap-2">
                    <button type="button" class="px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40 text-sm" @click="closeModal">
                        Cancel
                    </button>
                    <button type="button" class="px-3 py-2 rounded-md bg-white/10 text-slate-100 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-accent/40 text-sm" @click="onSave">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>


<style scoped>
/* no extra styles needed; Tailwind handles the switch visuals */
</style>
