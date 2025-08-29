<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

/* v-model:open API */
const props = defineProps({ open: { type: Boolean, default: false } })
const emit = defineEmits(['update:open', 'save'])

/* Refs & state */
const modalRef = ref(null)
const activeIconId = ref('youtube')

/* Mock shortcuts (mirrors your rail, gear excluded) */
const shortcuts = ref([
    { id: 'youtube', label: 'YouTube', icon: 'fa-brands fa-youtube' },
    { id: 'github', label: 'GitHub', icon: 'fa-brands fa-github' },
    { id: 'gmail', label: 'Gmail', icon: 'fa-regular fa-envelope' },
    { id: 'gdrive', label: 'Google Drive', icon: 'fa-brands fa-google-drive' },
    { id: 'chatgpt', label: 'ChatGPT', icon: 'fa-solid fa-robot' },
    { id: 'twitter', label: 'Twitter', icon: 'fa-brands fa-x-twitter' },
    { id: 'reddit', label: 'Reddit', icon: 'fa-brands fa-reddit-alien' },
    { id: 'linkedin', label: 'LinkedIn', icon: 'fa-brands fa-linkedin' },
    { id: 'steam', label: 'Steam', icon: 'fa-brands fa-steam' },
    { id: 'spotify', label: 'Spotify', icon: 'fa-brands fa-spotify' },
    { id: 'facebook', label: 'Facebook', icon: 'fa-brands fa-facebook' },
    { id: 'instagram', label: 'Instagram', icon: 'fa-brands fa-instagram' },
    { id: 'tiktok', label: 'TikTok', icon: 'fa-brands fa-tiktok' },
    { id: 'whatsapp', label: 'WhatsApp', icon: 'fa-brands fa-whatsapp' },
    { id: 'discord', label: 'Discord', icon: 'fa-brands fa-discord' },
    { id: 'amazon', label: 'Amazon', icon: 'fa-brands fa-amazon' },
    { id: 'netflix', label: 'Netflix', icon: 'fa-solid fa-n' },
    { id: 'openai', label: 'OpenAI', icon: 'fa-solid fa-brain' },
    { id: 'pinterest', label: 'Pinterest', icon: 'fa-brands fa-pinterest' },
    { id: 'apple', label: 'Apple', icon: 'fa-brands fa-apple' },
    { id: 'microsoft', label: 'Microsoft', icon: 'fa-brands fa-microsoft' },
    { id: 'slack', label: 'Slack', icon: 'fa-brands fa-slack' },
    { id: 'asana', label: 'Asana', icon: 'fa-solid fa-diagram-project' },
    { id: 'figma', label: 'Figma', icon: 'fa-brands fa-figma' },
    { id: 'dribbble', label: 'Dribbble', icon: 'fa-brands fa-dribbble' },
    { id: 'behance', label: 'Behance', icon: 'fa-brands fa-behance' },
    { id: 'trello', label: 'Trello', icon: 'fa-brands fa-trello' },
    { id: 'notion', label: 'Notion', icon: 'fa-regular fa-file-lines' },
    { id: 'medium', label: 'Medium', icon: 'fa-brands fa-medium' },
    { id: 'hn', label: 'Hacker News', icon: 'fa-solid fa-newspaper' },
    { id: 'bbc', label: 'BBC', icon: 'fa-solid fa-globe' },
    { id: 'cnn', label: 'CNN', icon: 'fa-solid fa-tv' },
    { id: 'nyt', label: 'NY Times', icon: 'fa-regular fa-newspaper' },
    { id: 'wapo', label: 'Washington Post', icon: 'fa-solid fa-scroll' },
    { id: 'bloomberg', label: 'Bloomberg', icon: 'fa-solid fa-chart-line' },
    { id: 'crypto', label: 'Crypto', icon: 'fa-solid fa-coins' },
    { id: 'weather', label: 'Weather', icon: 'fa-solid fa-cloud-sun' },
    { id: 'calendar', label: 'Calendar', icon: 'fa-regular fa-calendar' },
    { id: 'maps', label: 'Maps', icon: 'fa-solid fa-map' },
    { id: 'photos', label: 'Photos', icon: 'fa-regular fa-image' }
])

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
                    <!-- Search Settings -->
                    <section class="space-y-3">
                        <h3 class="text-sm font-medium text-slate-200">Search Settings</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <label class="text-sm text-slate-300">
                                <span class="block mb-1">Default provider</span>
                                <select class="w-full bg-white/5 rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]">
                                    <option>ChatGPT</option>
                                    <option>Google</option>
                                    <option>DuckDuckGo</option>
                                </select>
                            </label>

                            <label class="text-sm text-slate-300">
                                <span class="block mb-1">Open results</span>
                                <select class="w-full bg-white/5 rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]">
                                    <option>In current tab</option>
                                    <option>In new tab</option>
                                </select>
                            </label>
                        </div>
                    </section>

                    <!-- Shortcuts Manager -->
                    <section class="space-y-3">
                        <h3 class="text-sm font-medium text-slate-200">Shortcuts Manager</h3>
                        <p class="text-sm text-slate-400">
                            Drag icons in the left column to change order. Click an icon to edit its settings in the right panel.
                        </p>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Left: Icon Order (only this scrolls) -->
                            <div class="bg-white/5 rounded-md p-4 space-y-2">
                                <p class="text-xs uppercase text-slate-400 mb-2">Icon Order</p>
                                <div class="flex flex-col gap-2 max-h-[50vh] overflow-y-auto pr-1">
                                    <button v-for="item in shortcuts" :key="item.id" type="button" class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move text-left hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]" :class="activeIconId === item.id ? 'ring-2 ring-[var(--ring)]' : ''" @click="activeIconId = item.id">
                                        <i :class="item.icon + ' text-xl'"></i>
                                        <span class="text-slate-200 text-sm">{{ item.label }}</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Right: Icon Settings (mock) -->
                            <div class="bg-white/5 rounded-md p-4 space-y-3">
                                <p class="text-xs uppercase text-slate-400">Icon Settings</p>
                                <div class="space-y-4" v-if="activeIconId">
                                    <label class="text-sm text-slate-300 block">
                                        <span class="block mb-1">Label</span>
                                        <input type="text" :value="shortcuts.find(s => s.id === activeIconId)?.label" class="w-full bg-white/10 rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]" />
                                    </label>

                                    <label class="text-sm text-slate-300 block">
                                        <span class="block mb-1">URL</span>
                                        <input type="text" :value="'https://' + (shortcuts.find(s => s.id === activeIconId)?.label || '').toLowerCase().replaceAll(' ', '') + '.com'" class="w-full bg-white/10 rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]" />
                                    </label>

                                    <label class="text-sm text-slate-300 block">
                                        <span class="block mb-1">Icon class</span>
                                        <input type="text" :value="shortcuts.find(s => s.id === activeIconId)?.icon" class="w-full bg-white/10 rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]" />
                                    </label>
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
