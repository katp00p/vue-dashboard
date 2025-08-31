<script setup>
import { ref, onMounted, computed } from 'vue'
import ShortcutsSettingsModal from './shortcuts/ShortcutsSettingsModal.vue'
import { useShortcutsStore, PROVIDER_OPTIONS } from '@/stores/shortcuts'
import SiIcon from '@/components/ui/SiIcon.vue'

const store = useShortcutsStore()
onMounted(() => store.hydrate())

const q = ref('')
const isSettingsOpen = ref(false)

function enc(s) {
  return encodeURIComponent(s)
}

function urlFor(provider, query) {
  switch (provider) {
    case 'Google':
      return `https://www.google.com/search?q=${enc(query)}`
    case 'DuckDuckGo':
      return `https://duckduckgo.com/?q=${enc(query)}`
    case 'Bing':
      return `https://www.bing.com/search?q=${enc(query)}`
    case 'Perplexity':
      return `https://www.perplexity.ai/search?q=${enc(query)}`
    default:
      return `https://www.google.com/search?q=${enc(query)}`
  }
}

/* Map provider -> full option object (so we can read si or icon) */
const optionByValue = Object.fromEntries(PROVIDER_OPTIONS.map((o) => [o.value, o]))
const providerOpt = computed(() => optionByValue[store.provider] || null)
const providerSi = computed(() => providerOpt.value?.si || null)
const providerFA = computed(() => providerOpt.value?.icon || null)

async function onSubmit() {
  const text = q.value.trim()
  if (!text) return
  const href = urlFor(store.provider, text)
  if (store.openMode === 'new') {
    window.open(href, '_blank', 'noopener,noreferrer')
  } else {
    window.location.assign(href)
  }
}
</script>

<template>
  <!-- ===== Shortcuts + Search ===== -->
  <section class="mb-4 shrink-0" id="shortcuts">
    <div class="glass rounded-md px-4 py-3 flex items-center gap-4 overflow-hidden">
      <!-- Rail -->
      <div
        class="shortcuts-rail flex items-center gap-3 flex-nowrap overflow-x-auto overflow-y-hidden overscroll-x-contain h-12 [&>a]:inline-flex [&>a]:items-center [&>a]:justify-center [&>a]:leading-none [&>a]:h-12 [&>a>i]:block [&>a>i]:leading-none"
      >
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://www.youtube.com"
          title="YouTube"
          ><i class="fa-brands fa-youtube"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://github.com"
          title="GitHub"
          ><i class="fa-brands fa-github"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://mail.google.com"
          title="Gmail"
          ><i class="fa-regular fa-envelope"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://drive.google.com"
          title="Google Drive"
          ><i class="fa-brands fa-google-drive"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://chat.openai.com"
          title="ChatGPT"
          ><i class="fa-solid fa-robot"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://twitter.com"
          title="Twitter"
          ><i class="fa-brands fa-x-twitter"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://reddit.com"
          title="Reddit"
          ><i class="fa-brands fa-reddit-alien"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://linkedin.com"
          title="LinkedIn"
          ><i class="fa-brands fa-linkedin"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://store.steampowered.com"
          title="Steam"
          ><i class="fa-brands fa-steam"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://spotify.com"
          title="Spotify"
          ><i class="fa-brands fa-spotify"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://facebook.com"
          title="Facebook"
          ><i class="fa-brands fa-facebook"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://instagram.com"
          title="Instagram"
          ><i class="fa-brands fa-instagram"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://tiktok.com"
          title="TikTok"
          ><i class="fa-brands fa-tiktok"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://whatsapp.com"
          title="WhatsApp"
          ><i class="fa-brands fa-whatsapp"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://discord.com"
          title="Discord"
          ><i class="fa-brands fa-discord"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://amazon.com"
          title="Amazon"
          ><i class="fa-brands fa-amazon"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://netflix.com"
          title="Netflix"
          ><i class="fa-solid fa-n"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://openai.com"
          title="OpenAI"
          ><i class="fa-solid fa-brain"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://pinterest.com"
          title="Pinterest"
          ><i class="fa-brands fa-pinterest"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://apple.com"
          title="Apple"
          ><i class="fa-brands fa-apple"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://microsoft.com"
          title="Microsoft"
          ><i class="fa-brands fa-microsoft"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://slack.com"
          title="Slack"
          ><i class="fa-brands fa-slack"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://asana.com"
          title="Asana"
          ><i class="fa-solid fa-diagram-project"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://figma.com"
          title="Figma"
          ><i class="fa-brands fa-figma"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://dribbble.com"
          title="Dribbble"
          ><i class="fa-brands fa-dribbble"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://behance.net"
          title="Behance"
          ><i class="fa-brands fa-behance"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://trello.com"
          title="Trello"
          ><i class="fa-brands fa-trello"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://notion.so"
          title="Notion"
          ><i class="fa-regular fa-file-lines"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://medium.com"
          title="Medium"
          ><i class="fa-brands fa-medium"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://news.ycombinator.com"
          title="Hacker News"
          ><i class="fa-solid fa-newspaper"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://bbc.com"
          title="BBC"
          ><i class="fa-solid fa-globe"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://cnn.com"
          title="CNN"
          ><i class="fa-solid fa-tv"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://nytimes.com"
          title="NY Times"
          ><i class="fa-regular fa-newspaper"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://washingtonpost.com"
          title="Washington Post"
          ><i class="fa-solid fa-scroll"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://bloomberg.com"
          title="Bloomberg"
          ><i class="fa-solid fa-chart-line"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://coinmarketcap.com"
          title="Crypto"
          ><i class="fa-solid fa-coins"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://weather.com"
          title="Weather"
          ><i class="fa-solid fa-cloud-sun"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://calendar.google.com"
          title="Calendar"
          ><i class="fa-regular fa-calendar"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://maps.google.com"
          title="Maps"
          ><i class="fa-solid fa-map"></i
        ></a>
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="https://photos.google.com"
          title="Photos"
          ><i class="fa-regular fa-image"></i
        ></a>
        <!-- Gear opens settings modal -->
        <a
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition"
          href="#"
          title="Settings"
          @click.prevent="isSettingsOpen = true"
        >
          <i class="fa-solid fa-gear"></i>
        </a>
      </div>

      <!-- Spacer -->
      <div class="flex-1"></div>

      <!-- Right: Unified Search -->
      <form class="hidden md:flex items-center gap-2" @submit.prevent="onSubmit">
        <div class="relative">
          <!-- Provider icon (replaces magnifying glass) -->
          <span
            class="absolute left-3 top-1/2 -translate-y-1/2 opacity-90 text-slate-200 w-5 h-5 flex items-center justify-center"
          >
            <!-- Prefer Simple Icons if present; otherwise use FA class from store; otherwise fallback -->
            <SiIcon v-if="providerSi" :name="providerSi" class="w-5 h-5" aria-hidden="true" />
            <i
              v-else-if="providerFA"
              :class="providerFA + ' text-lg leading-none'"
              aria-hidden="true"
            ></i>
            <i
              v-else
              class="fa-solid fa-magnifying-glass text-lg leading-none"
              aria-hidden="true"
            ></i>
          </span>

          <input
            v-model="q"
            class="pl-10 pr-3 py-2 bg-white/10 rounded-md outline-none focus:ring-2 focus:ring-[var(--ring)] text-slate-100 placeholder:[color:var(--hint)] w-[400px]"
            placeholder="Search…"
            type="search"
            autocomplete="off"
          />
        </div>

        <button
          class="shrink-0 px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40 text-sm font-medium"
          type="submit"
          title="Open results"
        >
          Go
        </button>
      </form>
    </div>
  </section>

  <!-- Settings Modal -->
  <ShortcutsSettingsModal v-model:open="isSettingsOpen" />
</template>

<style scoped>
.shortcuts-rail {
  scrollbar-width: none;
}
.shortcuts-rail::-webkit-scrollbar {
  width: 0;
  height: 0;
}
:deep(input[type='search']::-webkit-search-cancel-button) {
  -webkit-appearance: none;
  height: 1.1em;
  width: 1.1em;
  cursor: pointer;
  opacity: 0.8;
  background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke='%23949ba1' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'><line x1='6' y1='6' x2='18' y2='18'/><line x1='6' y1='18' x2='18' y2='6'/></svg>");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
}
:deep(input[type='search']::-webkit-search-cancel-button:hover) {
  opacity: 1;
}
:deep(input[type='search']::-ms-clear) {
  display: none;
  width: 0;
  height: 0;
}
</style>
