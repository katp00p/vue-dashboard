<!-- src/components/ShortcutSearch.vue -->
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

/* Map provider -> option (for SI/FA icon) */
const optionByValue = Object.fromEntries(PROVIDER_OPTIONS.map((o) => [o.value, o]))
const providerOpt = computed(() => optionByValue[store.provider] || null)
const providerSi = computed(() => providerOpt.value?.si || null)
const providerFA = computed(() => providerOpt.value?.icon || null)

/* Registry for supported shortcuts (same data the manager uses) */
const REGISTRY = Object.freeze({
  youtube: {
    id: 'youtube',
    label: 'YouTube',
    icon: 'fa-brands fa-youtube',
    href: 'https://www.youtube.com',
  },
  github: {
    id: 'github',
    label: 'GitHub',
    icon: 'fa-brands fa-github',
    href: 'https://github.com',
  },
  gmail: {
    id: 'gmail',
    label: 'Gmail',
    icon: 'fa-regular fa-envelope',
    href: 'https://mail.google.com',
  },
  gdrive: {
    id: 'gdrive',
    label: 'Google Drive',
    icon: 'fa-brands fa-google-drive',
    href: 'https://drive.google.com',
  },
  chatgpt: {
    id: 'chatgpt',
    label: 'ChatGPT',
    icon: 'fa-solid fa-robot',
    href: 'https://chat.openai.com',
  },
  twitter: {
    id: 'twitter',
    label: 'Twitter',
    icon: 'fa-brands fa-x-twitter',
    href: 'https://twitter.com',
  },
  reddit: {
    id: 'reddit',
    label: 'Reddit',
    icon: 'fa-brands fa-reddit-alien',
    href: 'https://reddit.com',
  },
  linkedin: {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: 'fa-brands fa-linkedin',
    href: 'https://linkedin.com',
  },
  steam: {
    id: 'steam',
    label: 'Steam',
    icon: 'fa-brands fa-steam',
    href: 'https://store.steampowered.com',
  },
  spotify: {
    id: 'spotify',
    label: 'Spotify',
    icon: 'fa-brands fa-spotify',
    href: 'https://spotify.com',
  },
  facebook: {
    id: 'facebook',
    label: 'Facebook',
    icon: 'fa-brands fa-facebook',
    href: 'https://facebook.com',
  },
  instagram: {
    id: 'instagram',
    label: 'Instagram',
    icon: 'fa-brands fa-instagram',
    href: 'https://instagram.com',
  },
  tiktok: {
    id: 'tiktok',
    label: 'TikTok',
    icon: 'fa-brands fa-tiktok',
    href: 'https://tiktok.com',
  },
  whatsapp: {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: 'fa-brands fa-whatsapp',
    href: 'https://whatsapp.com',
  },
  discord: {
    id: 'discord',
    label: 'Discord',
    icon: 'fa-brands fa-discord',
    href: 'https://discord.com',
  },
  amazon: {
    id: 'amazon',
    label: 'Amazon',
    icon: 'fa-brands fa-amazon',
    href: 'https://amazon.com',
  },
  netflix: { id: 'netflix', label: 'Netflix', icon: 'fa-solid fa-n', href: 'https://netflix.com' },
  openai: { id: 'openai', label: 'OpenAI', icon: 'fa-solid fa-brain', href: 'https://openai.com' },
  pinterest: {
    id: 'pinterest',
    label: 'Pinterest',
    icon: 'fa-brands fa-pinterest',
    href: 'https://pinterest.com',
  },
  apple: { id: 'apple', label: 'Apple', icon: 'fa-brands fa-apple', href: 'https://apple.com' },
  microsoft: {
    id: 'microsoft',
    label: 'Microsoft',
    icon: 'fa-brands fa-microsoft',
    href: 'https://microsoft.com',
  },
  slack: { id: 'slack', label: 'Slack', icon: 'fa-brands fa-slack', href: 'https://slack.com' },
  asana: {
    id: 'asana',
    label: 'Asana',
    icon: 'fa-solid fa-diagram-project',
    href: 'https://asana.com',
  },
  figma: { id: 'figma', label: 'Figma', icon: 'fa-brands fa-figma', href: 'https://figma.com' },
  dribbble: {
    id: 'dribbble',
    label: 'Dribbble',
    icon: 'fa-brands fa-dribbble',
    href: 'https://dribbble.com',
  },
  behance: {
    id: 'behance',
    label: 'Behance',
    icon: 'fa-brands fa-behance',
    href: 'https://behance.net',
  },
  trello: {
    id: 'trello',
    label: 'Trello',
    icon: 'fa-brands fa-trello',
    href: 'https://trello.com',
  },
  notion: {
    id: 'notion',
    label: 'Notion',
    icon: 'fa-regular fa-file-lines',
    href: 'https://notion.so',
  },
  medium: {
    id: 'medium',
    label: 'Medium',
    icon: 'fa-brands fa-medium',
    href: 'https://medium.com',
  },
  hn: {
    id: 'hn',
    label: 'Hacker News',
    icon: 'fa-solid fa-newspaper',
    href: 'https://news.ycombinator.com',
  },
  bbc: { id: 'bbc', label: 'BBC', icon: 'fa-solid fa-globe', href: 'https://bbc.com' },
  cnn: { id: 'cnn', label: 'CNN', icon: 'fa-solid fa-tv', href: 'https://cnn.com' },
  nyt: {
    id: 'nyt',
    label: 'NY Times',
    icon: 'fa-regular fa-newspaper',
    href: 'https://nytimes.com',
  },
  wapo: {
    id: 'wapo',
    label: 'Washington Post',
    icon: 'fa-solid fa-scroll',
    href: 'https://washingtonpost.com',
  },
  bloomberg: {
    id: 'bloomberg',
    label: 'Bloomberg',
    icon: 'fa-solid fa-chart-line',
    href: 'https://bloomberg.com',
  },
  crypto: {
    id: 'crypto',
    label: 'Crypto',
    icon: 'fa-solid fa-coins',
    href: 'https://coinmarketcap.com',
  },
  weather: {
    id: 'weather',
    label: 'Weather',
    icon: 'fa-solid fa-cloud-sun',
    href: 'https://weather.com',
  },
  calendar: {
    id: 'calendar',
    label: 'Calendar',
    icon: 'fa-regular fa-calendar',
    href: 'https://calendar.google.com',
  },
  maps: { id: 'maps', label: 'Maps', icon: 'fa-solid fa-map', href: 'https://maps.google.com' },
  photos: {
    id: 'photos',
    label: 'Photos',
    icon: 'fa-regular fa-image',
    href: 'https://photos.google.com',
  },
})

/* Render ONLY what’s saved in the store */
const orderedShortcuts = computed(() => {
  const ord = Array.isArray(store.order) ? store.order : null
  if (ord && ord.length) return ord.map((id) => REGISTRY[id]).filter(Boolean)
  return Object.values(REGISTRY)
})

async function onSubmit() {
  const text = q.value.trim()
  if (!text) return
  const href = urlFor(store.provider, text)
  if (store.openMode === 'new') window.open(href, '_blank', 'noopener,noreferrer')
  else window.location.assign(href)
}
</script>

<template>
  <!-- ===== Shortcuts + Search ===== -->
  <section class="mb-4 shrink-0" id="shortcuts">
    <div class="glass rounded-md px-4 py-3 flex items-center gap-4 overflow-hidden">
      <!-- Scrollable rail (icons only) -->
      <div
        class="shortcuts-rail flex items-center gap-3 flex-nowrap overflow-x-auto overflow-y-hidden overscroll-x-contain h-12 [&>a]:inline-flex [&>a]:items-center [&>a]:justify-center [&>a]:leading-none [&>a]:h-12 [&>a>i]:block [&>a>i]:leading-none"
      >
        <a
          v-for="item in orderedShortcuts"
          :key="item.id"
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition w-12 min-w-[3rem] justify-center"
          :href="item.href"
          :title="item.label"
        >
          <i :class="item.icon"></i>
        </a>
      </div>

      <!-- Spacer -->
      <div class="flex-1"></div>

      <!-- Gear: smaller, forced color, vertically centered, fixed size -->
      <a
        class="shortcut text-2xl drop-shadow-lg hover:scale-110 transition inline-flex items-center justify-center h-12 w-12 min-w-[3rem]"
        href="#"
        title="Settings"
        @click.prevent="isSettingsOpen = true"
        style="color: #88929b !important"
      >
        <i
          class="fa-solid fa-gear leading-none"
          aria-hidden="true"
          style="color: #88929b !important"
        ></i>
      </a>

      <!-- Right: Unified Search -->
      <form class="hidden md:flex items-center gap-2" @submit.prevent="onSubmit">
        <div class="relative">
          <!-- Provider icon (replaces magnifying glass) -->
          <span
            class="absolute left-3 top-1/2 -translate-y-1/2 opacity-90 text-slate-200 w-5 h-5 flex items-center justify-center"
          >
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
