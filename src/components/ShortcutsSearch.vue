<script setup>
import { ref } from 'vue'
import ShortcutsSettingsModal from './shortcuts/ShortcutsSettingsModal.vue'

/**
 * State & Refs
 */
const isOpen = ref(false)
const gearBtnRef = ref(null)

function openModal() {
    isOpen.value = true
}

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

    <ShortcutsSettingsModal v-model:open="isOpen" />
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
