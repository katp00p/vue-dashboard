<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

/**
 * State & Refs
 */
const isOpen = ref(false)
const gearBtnRef = ref(null)
const modalRef = ref(null)

/**
 * Utils: focusable elements selector and helpers
 */
const FOCUSABLE =
    'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function getFocusables() {
    const root = modalRef.value
    if (!root) return []
    return Array.from(root.querySelectorAll(FOCUSABLE)).filter(
        (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
    )
}

/**
 * Open / Close
 * - Locks body scroll while modal is open
 * - Manages focus for a11y
 * - Adds/Removes keydown listeners for ESC and focus trap
 */
function openModal() {
    isOpen.value = true
    document.documentElement.style.overflow = 'hidden'
    nextTick(() => {
        const [first] = getFocusables()
        first?.focus()
    })
}

function closeModal() {
    isOpen.value = false
    document.documentElement.style.overflow = ''
    // restore focus to the gear button
    gearBtnRef.value?.focus()
}

function onOverlayClick(e) {
    // only close when clicking the backdrop (not the panel)
    if (e.target === e.currentTarget) closeModal()
}

function onKeydown(e) {
    if (!isOpen.value) return

    // ESC closes
    if (e.key === 'Escape') {
        e.preventDefault()
        closeModal()
        return
    }

    // Basic focus trap
    if (e.key === 'Tab') {
        const focusables = getFocusables()
        if (focusables.length === 0) return

        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        const active = document.activeElement

        if (e.shiftKey) {
            // shift + tab
            if (active === first || !modalRef.value?.contains(active)) {
                e.preventDefault()
                last.focus()
            }
        } else {
            // tab
            if (active === last || !modalRef.value?.contains(active)) {
                e.preventDefault()
                first.focus()
            }
        }
    }
}

onMounted(() => {
    window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
    document.documentElement.style.overflow = ''
})

/**
 * ChatGPT search (placeholder)
 * We prevent full page reload and can later wire to a store or router.
 */
function onSearchSubmit(e) {
    e.preventDefault()
    // TODO: dispatch to Pinia or navigate to /search?q=...
    // For now, no-op.
}
</script>

<template>
    <!-- ===== Shortcuts + ChatGPT Search ===== -->
    <section class="mb-4 shrink-0" id="shortcuts">
        <div class="glass rounded-md px-4 py-3 flex items-center gap-4 overflow-hidden">
            <!-- Rail -->
            <div class="shortcuts-rail flex items-center gap-3 flex-nowrap overflow-x-auto overflow-y-hidden overscroll-x-contain h-12 [&>a]:inline-flex [&>a]:items-center [&>a]:justify-center [&>a]:leading-none [&>a]:h-12 [&>a>i]:block [&>a>i]:leading-none">
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://www.youtube.com" title="YouTube"><i class="fa-brands fa-youtube"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://github.com" title="GitHub"><i class="fa-brands fa-github"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://mail.google.com" title="Gmail"><i class="fa-regular fa-envelope"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://drive.google.com" title="Google Drive"><i class="fa-brands fa-google-drive"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://chat.openai.com" title="ChatGPT"><i class="fa-solid fa-robot"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://twitter.com" title="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://reddit.com" title="Reddit"><i class="fa-brands fa-reddit-alien"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://linkedin.com" title="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://store.steampowered.com" title="Steam"><i class="fa-brands fa-steam"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://spotify.com" title="Spotify"><i class="fa-brands fa-spotify"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://facebook.com" title="Facebook"><i class="fa-brands fa-facebook"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://instagram.com" title="Instagram"><i class="fa-brands fa-instagram"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://tiktok.com" title="TikTok"><i class="fa-brands fa-tiktok"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://whatsapp.com" title="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://discord.com" title="Discord"><i class="fa-brands fa-discord"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://amazon.com" title="Amazon"><i class="fa-brands fa-amazon"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://netflix.com" title="Netflix"><i class="fa-solid fa-n"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://openai.com" title="OpenAI"><i class="fa-solid fa-brain"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://pinterest.com" title="Pinterest"><i class="fa-brands fa-pinterest"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://apple.com" title="Apple"><i class="fa-brands fa-apple"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://microsoft.com" title="Microsoft"><i class="fa-brands fa-microsoft"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://slack.com" title="Slack"><i class="fa-brands fa-slack"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://asana.com" title="Asana"><i class="fa-solid fa-diagram-project"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://figma.com" title="Figma"><i class="fa-brands fa-figma"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://dribbble.com" title="Dribbble"><i class="fa-brands fa-dribbble"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://behance.net" title="Behance"><i class="fa-brands fa-behance"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://trello.com" title="Trello"><i class="fa-brands fa-trello"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://notion.so" title="Notion"><i class="fa-regular fa-file-lines"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://medium.com" title="Medium"><i class="fa-brands fa-medium"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://news.ycombinator.com" title="Hacker News"><i class="fa-solid fa-newspaper"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://bbc.com" title="BBC"><i class="fa-solid fa-globe"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://cnn.com" title="CNN"><i class="fa-solid fa-tv"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://nytimes.com" title="NY Times"><i class="fa-regular fa-newspaper"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://washingtonpost.com" title="Washington Post"><i class="fa-solid fa-scroll"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://bloomberg.com" title="Bloomberg"><i class="fa-solid fa-chart-line"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://coinmarketcap.com" title="Crypto"><i class="fa-solid fa-coins"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://weather.com" title="Weather"><i class="fa-solid fa-cloud-sun"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://calendar.google.com" title="Calendar"><i class="fa-regular fa-calendar"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://maps.google.com" title="Maps"><i class="fa-solid fa-map"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://photos.google.com" title="Photos"><i class="fa-regular fa-image"></i></a>

                <!-- Final single (pure white gear) -->
                <a ref="gearBtnRef" class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition cursor-pointer" href="#" title="Settings" aria-haspopup="dialog" aria-controls="shortcuts-settings" @click.prevent="openModal">
                    <i class="fa-solid fa-gear"></i>
                </a>
            </div>

            <!-- Spacer -->
            <div class="flex-1"></div>

            <!-- Right: ChatGPT Search -->
            <form class="hidden md:flex items-center gap-2" @submit="onSearchSubmit">
                <div class="relative">
                    <i class="fa-solid fa-robot absolute left-3 top-1/2 -translate-y-1/2 opacity-70"></i>
                    <input class="pl-10 pr-3 py-2 bg-white/5 rounded-md outline-none focus:ring-2 focus:ring-[var(--ring)] text-slate-100 placeholder:[color:var(--hint)] w-[400px]" placeholder="Ask ChatGPT…" type="search" aria-label="Ask ChatGPT" />
                </div>

                <button class="shrink-0 px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40 text-sm font-medium" type="submit">
                    Go
                </button>
            </form>
        </div>
    </section>

    <!-- ===== Settings Modal (teleported but defined here) ===== -->
    <Teleport to="body">
        <div v-show="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="settings-title" id="shortcuts-settings" @click="onOverlayClick">
            <!-- Panel -->
            <div ref="modalRef" class="w-full max-w-6xl max-h-[85vh] rounded-xl glass shadow-xl outline-none flex flex-col">
                <div class="flex items-center justify-between p-4 border-b border-white/10">
                    <h2 id="settings-title" class="text-lg font-semibold text-slate-100 tracking-wide">Shortcuts & Search</h2>
                </div>

                <!-- Body -->
                <div class="p-6 space-y-8">
                    <!-- ===== Search Settings ===== -->
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

                    <!-- ===== Shortcuts Manager ===== -->
                    <section class="space-y-3">
                        <h3 class="text-sm font-medium text-slate-200">Shortcuts Manager</h3>
                        <p class="text-sm text-slate-400">
                            Drag icons in the left column to change order. Click an icon to edit its settings in the right panel.
                        </p>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Left: Draggable Column (mockup) -->
                            <div class="bg-white/5 rounded-md p-4 space-y-2">
                                <p class="text-xs uppercase text-slate-400 mb-2">Icon Order</p>
                                <div class="flex flex-col gap-2 max-h-[50vh] overflow-y-auto pr-1">
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-youtube text-xl"></i><span class="text-slate-200 text-sm">YouTube</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-github text-xl"></i><span class="text-slate-200 text-sm">GitHub</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-regular fa-envelope text-xl"></i><span class="text-slate-200 text-sm">Gmail</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-google-drive text-xl"></i><span class="text-slate-200 text-sm">Google Drive</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-solid fa-robot text-xl"></i><span class="text-slate-200 text-sm">ChatGPT</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-x-twitter text-xl"></i><span class="text-slate-200 text-sm">Twitter</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-reddit-alien text-xl"></i><span class="text-slate-200 text-sm">Reddit</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-linkedin text-xl"></i><span class="text-slate-200 text-sm">LinkedIn</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-steam text-xl"></i><span class="text-slate-200 text-sm">Steam</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-spotify text-xl"></i><span class="text-slate-200 text-sm">Spotify</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-facebook text-xl"></i><span class="text-slate-200 text-sm">Facebook</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-instagram text-xl"></i><span class="text-slate-200 text-sm">Instagram</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-tiktok text-xl"></i><span class="text-slate-200 text-sm">TikTok</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-whatsapp text-xl"></i><span class="text-slate-200 text-sm">WhatsApp</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-discord text-xl"></i><span class="text-slate-200 text-sm">Discord</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-amazon text-xl"></i><span class="text-slate-200 text-sm">Amazon</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-solid fa-n text-xl"></i><span class="text-slate-200 text-sm">Netflix</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-solid fa-brain text-xl"></i><span class="text-slate-200 text-sm">OpenAI</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-pinterest text-xl"></i><span class="text-slate-200 text-sm">Pinterest</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-apple text-xl"></i><span class="text-slate-200 text-sm">Apple</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-microsoft text-xl"></i><span class="text-slate-200 text-sm">Microsoft</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-slack text-xl"></i><span class="text-slate-200 text-sm">Slack</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-solid fa-diagram-project text-xl"></i><span class="text-slate-200 text-sm">Asana</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-figma text-xl"></i><span class="text-slate-200 text-sm">Figma</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-dribbble text-xl"></i><span class="text-slate-200 text-sm">Dribbble</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-behance text-xl"></i><span class="text-slate-200 text-sm">Behance</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-trello text-xl"></i><span class="text-slate-200 text-sm">Trello</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-regular fa-file-lines text-xl"></i><span class="text-slate-200 text-sm">Notion</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-brands fa-medium text-xl"></i><span class="text-slate-200 text-sm">Medium</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-solid fa-newspaper text-xl"></i><span class="text-slate-200 text-sm">Hacker News</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-solid fa-globe text-xl"></i><span class="text-slate-200 text-sm">BBC</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-solid fa-tv text-xl"></i><span class="text-slate-200 text-sm">CNN</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-regular fa-newspaper text-xl"></i><span class="text-slate-200 text-sm">NY Times</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-solid fa-scroll text-xl"></i><span class="text-slate-200 text-sm">Washington Post</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-solid fa-chart-line text-xl"></i><span class="text-slate-200 text-sm">Bloomberg</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-solid fa-coins text-xl"></i><span class="text-slate-200 text-sm">Crypto</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-solid fa-cloud-sun text-xl"></i><span class="text-slate-200 text-sm">Weather</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-regular fa-calendar text-xl"></i><span class="text-slate-200 text-sm">Calendar</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-solid fa-map text-xl"></i><span class="text-slate-200 text-sm">Maps</span>
                                    </div>
                                    <div class="flex items-center gap-3 p-2 bg-white/10 rounded cursor-move">
                                        <i class="fa-regular fa-image text-xl"></i><span class="text-slate-200 text-sm">Photos</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Right: Icon Settings (mockup) -->
                            <div class="bg-white/5 rounded-md p-4 space-y-3">
                                <p class="text-xs uppercase text-slate-400">Icon Settings</p>
                                <div class="space-y-4">
                                    <label class="text-sm text-slate-300 block">
                                        <span class="block mb-1">Label</span>
                                        <input type="text" value="YouTube" class="w-full bg-white/10 rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]" />
                                    </label>

                                    <label class="text-sm text-slate-300 block">
                                        <span class="block mb-1">URL</span>
                                        <input type="text" value="https://youtube.com" class="w-full bg-white/10 rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]" />
                                    </label>

                                    <label class="text-sm text-slate-300 block">
                                        <span class="block mb-1">Icon</span>
                                        <input type="text" value="fa-brands fa-youtube" class="w-full bg-white/10 rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]" />
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
                    <button type="button" class="px-3 py-2 rounded-md bg-white/10 text-slate-100 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-accent/40 text-sm" @click="closeModal">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.shortcuts-rail {
    scrollbar-width: none;
}

.shortcuts-rail::-webkit-scrollbar {
    width: 0;
    height: 0;
}
</style>
