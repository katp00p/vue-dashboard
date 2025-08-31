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

/* Render directly from the store (LocalStorage) */
const shortcuts = computed(() => (Array.isArray(store.shortcuts) ? store.shortcuts : []))

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
          v-for="item in shortcuts"
          :key="item.id"
          class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition w-12 min-w-[3rem] justify-center"
          :href="item.href || '#'"
          :title="item.label || item.id || 'shortcut'"
        >
          <!-- Use provided Font Awesome classes if present; otherwise a subtle placeholder -->
          <i v-if="item.icon" :class="item.icon"></i>
          <i v-else class="fa-regular fa-circle text-2xl opacity-60"></i>
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
