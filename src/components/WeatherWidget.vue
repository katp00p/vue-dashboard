<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { VueSpinnerOval } from 'vue3-spinners'
import { Dialog, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue'

// ==== Location (your coords) ====
const LAT = 43.764315
const LON = -79.199

// ==== Modal state ====
const isOpen = ref(false)
function openModal() {
  isOpen.value = true
}
function closeModal() {
  isOpen.value = false
}
function onKeyActivate(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    openModal()
  }
}

// ==== Reactive state ====
const loading = ref(true)
const error = ref('')
const current = ref(null)
const daily = ref([])

// ==== Helpers ====
function codeToText(code) {
  if (code === 0) return 'Clear sky'
  if ([1, 2, 3].includes(code)) return ['Mainly clear', 'Partly cloudy', 'Overcast'][code - 1]
  if ([45, 48].includes(code)) return 'Fog'
  if ([51, 53, 55].includes(code)) return 'Drizzle'
  if ([56, 57].includes(code)) return 'Freezing drizzle'
  if ([61, 63, 65].includes(code)) return 'Rain'
  if ([66, 67].includes(code)) return 'Freezing rain'
  if ([71, 73, 75].includes(code)) return 'Snow'
  if (code === 77) return 'Snow grains'
  if ([80, 81, 82].includes(code)) return 'Rain showers'
  if ([85, 86].includes(code)) return 'Snow showers'
  if (code === 95) return 'Thunderstorm'
  if ([96, 97, 98, 99].includes(code)) return 'Thunderstorm w/ hail'
  return 'Unknown'
}

function codeToIcon(code, isDay = true) {
  if (code === 0) return isDay ? 'fa-solid fa-sun' : 'fa-solid fa-moon'
  if ([1, 2].includes(code)) return isDay ? 'fa-solid fa-cloud-sun' : 'fa-solid fa-cloud-moon'
  if (code === 3) return 'fa-solid fa-cloud'
  if ([45, 48].includes(code)) return 'fa-solid fa-smog'
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'fa-solid fa-cloud-rain'
  if ([56, 57, 66, 67].includes(code)) return 'fa-solid fa-cloud-rain'
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'fa-solid fa-snowflake'
  if ([95, 96, 97, 98, 99].includes(code)) return 'fa-solid fa-cloud-bolt'
  return 'fa-solid fa-cloud'
}

function fmtDay(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString(undefined, { weekday: 'short' })
}

function round(n) {
  return typeof n === 'number' ? Math.round(n) : n
}

// ==== Derived ====
const currentText = computed(() => (current.value ? codeToText(current.value.code) : '—'))
const currentIcon = computed(() =>
  current.value ? codeToIcon(current.value.code, current.value.isDay) : 'fa-solid fa-cloud',
)
const currentTemp = computed(() => (current.value ? `${round(current.value.temp)}°C` : '—'))
const todayHi = computed(() => (daily.value.length ? `${round(daily.value[0].tMax)}°` : '—'))
const todayLo = computed(() => (daily.value.length ? `${round(daily.value[0].tMin)}°` : '—'))

// ==== Fetch ====
async function fetchWeather() {
  loading.value = true
  error.value = ''
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=7&timezone=auto`
    const { data } = await axios.get(url, { timeout: 10000 })

    if (data?.current_weather) {
      const { temperature, weathercode, is_day } = data.current_weather
      current.value = {
        temp: temperature,
        code: weathercode,
        isDay: Boolean(is_day),
      }
    }

    const days = []
    const tMax = data?.daily?.temperature_2m_max || []
    const tMin = data?.daily?.temperature_2m_min || []
    const codes = data?.daily?.weathercode || []
    const dates = data?.daily?.time || []

    for (let i = 0; i < dates.length; i++) {
      days.push({
        date: dates[i],
        tMax: tMax[i],
        tMin: tMin[i],
        code: codes[i],
      })
    }
    daily.value = days
  } catch (e) {
    error.value = 'Unable to load weather right now.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchWeather)
</script>

<template>
  <!-- WEATHER -->
  <section
    class="glass rounded-md shadow-card p-5 w-full overflow-hidden cursor-pointer hover:ring-1 ring-accent/40 transition"
    id="widget-weather"
    aria-labelledby="weather-title"
    aria-haspopup="dialog"
    aria-controls="weather-details-modal"
    role="button"
    tabindex="0"
    @click="openModal"
    @keydown="onKeyActivate"
  >
    <!-- Show spinner while loading -->
    <div v-if="loading" class="flex items-center justify-center h-40">
      <VueSpinnerOval size="48" color="#38bdf8" />
    </div>

    <!-- Show error if failed -->
    <div v-else-if="error" class="text-center text-red-400 py-10">
      {{ error }}
    </div>

    <!-- Show weather once loaded -->
    <template v-else>
      <!-- Header / Current -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 id="weather-title" class="card-title text-slate-100 font-semibold tracking-wide">
            Scarborough Weather
          </h2>
          <p class="text-slate-300 text-sm">{{ currentText }}</p>
        </div>
        <div class="flex items-center gap-3">
          <i :class="[currentIcon]" class="text-4xl text-white" aria-hidden="true"></i>
          <div class="text-right">
            <p class="text-3xl font-bold text-white leading-tight">{{ currentTemp }}</p>
            <p class="text-slate-300 text-sm leading-tight">H: {{ todayHi }} / L: {{ todayLo }}</p>
          </div>
        </div>
      </div>

      <!-- 7-Day Forecast -->
      <div class="grid grid-cols-7 gap-3 text-center text-slate-300 text-sm mt-3" role="list">
        <div
          v-for="d in daily"
          :key="d.date"
          role="listitem"
          class="rounded-lg py-3 border border-accent/30 bg-accent/15"
          :aria-label="`${fmtDay(d.date)}: ${codeToText(d.code)}, high ${round(d.tMax)} degrees, low ${round(d.tMin)} degrees`"
        >
          <p class="font-medium">{{ fmtDay(d.date) }}</p>
          <i :class="[codeToIcon(d.code, true)]" class="text-lg text-white" aria-hidden="true"></i>
          <p class="text-sm">{{ round(d.tMax) }}° / {{ round(d.tMin) }}°</p>
        </div>
      </div>
    </template>
  </section>

  <!-- ===== Modal (empty for now) ===== -->
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-50" @close="closeModal">
      <!-- Overlay -->
      <TransitionChild
        as="template"
        enter="ease-out duration-200"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-150"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/60" />
      </TransitionChild>

      <!-- Panel -->
      <div class="fixed inset-0 overflow-y-auto" id="weather-details-modal">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="ease-out duration-200"
            enter-from="opacity-0 translate-y-2 scale-95"
            enter-to="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-150"
            leave-from="opacity-100 translate-y-0 scale-100"
            leave-to="opacity-0 translate-y-2 scale-95"
          >
            <DialogPanel
              class="w-full max-w-2xl glass rounded-2xl shadow-xl p-6 focus:outline-none"
            >
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-lg font-semibold text-slate-100">Weather details</h3>
                <button
                  type="button"
                  @click="closeModal"
                  class="text-slate-300 hover:text-slate-100 transition"
                  aria-label="Close"
                >
                  <i class="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>

              <!-- Empty body for now -->
              <div class="text-slate-300">
                <p class="text-sm opacity-70">More data coming soon…</p>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>
#widget-weather .card-title {
  letter-spacing: 0.02em;
}
</style>
