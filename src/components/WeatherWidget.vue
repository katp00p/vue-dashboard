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
const current = ref(null) // { temp, code, isDay, windspeed, winddirection, time }
const daily = ref([]) // 14 days
const next24 = ref([]) // next 24 hours for the list

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
function fmtDateShort(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}
function fmtTime(ts) {
  const d = new Date(ts)
  return d.toLocaleTimeString(undefined, { hour: 'numeric' })
}
function fmtHM(ts) {
  const d = new Date(ts)
  return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
}
function round(n) {
  return typeof n === 'number' ? Math.round(n) : n
}

// ==== Derived (widget header) ====
const currentText = computed(() => (current.value ? codeToText(current.value.code) : '—'))
const currentIcon = computed(() =>
  current.value ? codeToIcon(current.value.code, current.value.isDay) : 'fa-solid fa-cloud',
)
const currentTemp = computed(() => (current.value ? `${round(current.value.temp)}°C` : '—'))
const todayHi = computed(() => (daily.value.length ? `${round(daily.value[0].tMax)}°` : '—'))
const todayLo = computed(() => (daily.value.length ? `${round(daily.value[0].tMin)}°` : '—'))

const week1 = computed(() => daily.value.slice(0, 7))
const week2 = computed(() => daily.value.slice(7, 14))

// ==== Fetch ====
async function fetchWeather() {
  loading.value = true
  error.value = ''
  try {
    const { data } = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: LAT,
        longitude: LON,
        current_weather: true,
        daily: [
          'temperature_2m_max',
          'temperature_2m_min',
          'apparent_temperature_max',
          'apparent_temperature_min',
          'precipitation_sum',
          'precipitation_probability_max',
          'windspeed_10m_max',
          'windgusts_10m_max',
          'sunrise',
          'sunset',
          'uv_index_max',
          'weathercode',
        ].join(','),
        hourly: [
          'temperature_2m',
          'apparent_temperature',
          'precipitation_probability',
          'precipitation',
          'weathercode',
        ].join(','),
        forecast_days: 14,
        timezone: 'auto',
      },
      timeout: 12000,
    })

    // current
    if (data?.current_weather) {
      const { temperature, weathercode, is_day, windspeed, winddirection, time } =
        data.current_weather
      current.value = {
        temp: temperature,
        code: weathercode,
        isDay: Boolean(is_day),
        windspeed,
        winddirection,
        time,
      }
    }

    // daily
    const d = data?.daily || {}
    const days = []
    const len = (d.time || []).length
    for (let i = 0; i < len; i++) {
      days.push({
        date: d.time?.[i],
        tMax: d.temperature_2m_max?.[i],
        tMin: d.temperature_2m_min?.[i],
        feelsMax: d.apparent_temperature_max?.[i],
        feelsMin: d.apparent_temperature_min?.[i],
        precipSum: d.precipitation_sum?.[i],
        precipProbMax: d.precipitation_probability_max?.[i],
        windMax: d.windspeed_10m_max?.[i],
        gustMax: d.windgusts_10m_max?.[i],
        sunrise: d.sunrise?.[i],
        sunset: d.sunset?.[i],
        uvMax: d.uv_index_max?.[i],
        code: d.weathercode?.[i],
      })
    }
    daily.value = days

    // hourly → next 24 hours list
    const h = data?.hourly || {}
    next24.value = []
    if (h.time?.length) {
      // align to current hour
      let idx = 0
      if (current.value?.time) {
        const curHour = current.value.time.slice(0, 13)
        const found = h.time.findIndex((t) => t.slice(0, 13) === curHour)
        idx = found >= 0 ? found : 0
      }
      const end = Math.min(idx + 24, h.time.length)
      for (let i = idx; i < end; i++) {
        next24.value.push({
          time: h.time[i],
          temp: h.temperature_2m?.[i],
          feels: h.apparent_temperature?.[i],
          code: h.weathercode?.[i],
          pprob: h.precipitation_probability?.[i],
        })
      }
    }
  } catch (e) {
    error.value = 'Unable to load weather right now.'
    console.error('Weather fetch failed:', e?.response?.data || e?.message || e)
  } finally {
    loading.value = false
  }
}

onMounted(fetchWeather)
</script>

<template>
  <!-- WEATHER (clickable to open modal) -->
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
    <!-- Spinner -->
    <div v-if="loading" class="flex items-center justify-center h-40">
      <VueSpinnerOval size="48" color="#38bdf8" />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center text-red-400 py-10">
      {{ error }}
    </div>

    <!-- Content -->
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

      <!-- 7-Day Forecast (compact) -->
      <div class="grid grid-cols-7 gap-3 text-center text-slate-300 text-sm mt-3" role="list">
        <div
          v-for="d in daily.slice(0, 7)"
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

  <!-- ===== Modal (Now / Hourly / Two-week) ===== -->
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
              class="w-full max-w-4xl glass rounded-2xl shadow-xl p-6 focus:outline-none"
            >
              <div class="flex items-start justify-between mb-5">
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

              <!-- Section 1: NOW -->
              <section class="mb-5 rounded-xl border border-white/20 bg-white/5 p-4">
                <div class="flex flex-wrap items-center justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <i :class="[currentIcon]" class="text-3xl text-white" aria-hidden="true"></i>
                    <div>
                      <p class="text-slate-200 font-medium">{{ currentText }}</p>
                      <p class="text-slate-400 text-sm">
                        As of
                        <span class="text-slate-200">{{
                          current?.time ? fmtHM(current.time) : '—'
                        }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-3xl font-bold text-white leading-tight">{{ currentTemp }}</p>
                    <p class="text-slate-300 text-sm leading-tight">
                      H: {{ todayHi }} / L: {{ todayLo }}
                    </p>
                  </div>
                </div>

                <div class="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div class="text-slate-300">
                    Feels like<br /><span class="text-slate-100 font-semibold"
                      >{{ daily[0]?.feelsMax != null ? Math.round(daily[0].feelsMax) : '—' }}° /
                      {{ daily[0]?.feelsMin != null ? Math.round(daily[0].feelsMin) : '—' }}°</span
                    >
                  </div>
                  <div class="text-slate-300">
                    Wind<br /><span class="text-slate-100 font-semibold"
                      >{{
                        current?.windspeed != null ? Math.round(current.windspeed) : '—'
                      }}
                      km/h</span
                    >
                  </div>
                  <div class="text-slate-300">
                    Precip chance<br /><span class="text-slate-100 font-semibold"
                      >{{ daily[0]?.precipProbMax ?? '—' }}%</span
                    >
                  </div>
                  <div class="text-slate-300">
                    UV max today<br /><span class="text-slate-100 font-semibold">{{
                      daily[0]?.uvMax ?? '—'
                    }}</span>
                  </div>
                </div>
              </section>

              <!-- Section 2: HOURLY (brand-new ultra-compact flex rows) -->
              <section class="mb-6">
                <p class="text-slate-400 text-[10px] uppercase tracking-wide mb-2">Next 24 hours</p>

                <div class="rounded-xl border border-white/15 bg-white/5 overflow-hidden">
                  <!-- header -->
                  <div
                    class="flex items-center px-3 py-1 text-[11px] text-slate-400 bg-white/5 leading-3 whitespace-nowrap"
                  >
                    <div class="w-[64px]">Time</div>
                    <div class="w-[20px] text-center">⛅</div>
                    <div class="flex-1"></div>
                    <div class="w-[56px] text-right">Temp</div>
                    <div class="w-[56px] text-right">Feels</div>
                    <div class="w-[48px] text-right">💧%</div>
                  </div>

                  <!-- rows -->
                  <div class="max-h-48 overflow-y-auto divide-y divide-white/10">
                    <div
                      v-for="h in next24"
                      :key="h.time"
                      class="flex items-center px-3 py-0.5 text-[11px] leading-3 whitespace-nowrap tabular-nums"
                      :aria-label="`${fmtTime(h.time)}: ${codeToText(h.code)}, ${Math.round(h.temp)}°C, precip ${h.pprob ?? 0}%`"
                    >
                      <div class="w-[64px] text-slate-300">{{ fmtTime(h.time) }}</div>
                      <div class="w-[20px] text-center">
                        <i
                          :class="codeToIcon(h.code, true)"
                          class="text-[12px] text-white"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div class="flex-1 overflow-hidden text-ellipsis text-slate-400"></div>
                      <div class="w-[56px] text-right text-slate-100 font-semibold">
                        {{ h.temp != null ? Math.round(h.temp) : '—' }}°
                      </div>
                      <div class="w-[56px] text-right text-slate-300">
                        {{ h.feels != null ? Math.round(h.feels) : '—' }}°
                      </div>
                      <div class="w-[48px] text-right text-slate-300">{{ h.pprob ?? 0 }}%</div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Section 3: TWO-WEEK (unchanged) -->
              <section>
                <p class="text-slate-400 text-xs uppercase tracking-wide mb-2">Two-week outlook</p>

                <!-- Week 1 -->
                <div class="grid grid-cols-7 gap-3 mb-3">
                  <div
                    v-for="d in week1"
                    :key="`w1-${d.date}`"
                    class="rounded-lg py-3 border border-accent/30 bg-accent/10 text-center"
                    :aria-label="`${fmtDay(d.date)} ${fmtDateShort(d.date)}: ${codeToText(d.code)}, high ${round(d.tMax)}°, low ${round(d.tMin)}°`"
                  >
                    <p class="font-medium text-slate-200">{{ fmtDay(d.date) }}</p>
                    <p class="text-xs text-slate-400">{{ fmtDateShort(d.date) }}</p>
                    <i
                      :class="codeToIcon(d.code, true)"
                      class="text-lg text-white my-1"
                      aria-hidden="true"
                    ></i>
                    <p class="text-sm text-slate-300">
                      {{ round(d.tMax) }}° / {{ round(d.tMin) }}°
                    </p>
                  </div>
                </div>

                <!-- Week 2 -->
                <div class="grid grid-cols-7 gap-3">
                  <div
                    v-for="d in week2"
                    :key="`w2-${d.date}`"
                    class="rounded-lg py-3 border border-accent/30 bg-accent/10 text-center"
                    :aria-label="`${fmtDay(d.date)} ${fmtDateShort(d.date)}: ${codeToText(d.code)}, high ${round(d.tMax)}°, low ${round(d.tMin)}°`"
                  >
                    <p class="font-medium text-slate-200">{{ fmtDay(d.date) }}</p>
                    <p class="text-xs text-slate-400">{{ fmtDateShort(d.date) }}</p>
                    <i
                      :class="codeToIcon(d.code, true)"
                      class="text-lg text-white my-1"
                      aria-hidden="true"
                    ></i>
                    <p class="text-sm text-slate-300">
                      {{ round(d.tMax) }}° / {{ round(d.tMin) }}°
                    </p>
                  </div>
                </div>
              </section>
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
/* Lighter scrollbars on dark */
::-webkit-scrollbar {
  height: 6px;
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background: rgba(148, 155, 161, 0.3);
  border-radius: 4px;
}
</style>
