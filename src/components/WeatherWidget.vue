<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import { VueSpinnerOval } from 'vue3-spinners'
import WeatherDetailsModal from './weather/WeatherDetailsModal.vue'
import { codeToText, codeToIcon, fmtDay, round } from '../utils/weatherUtils'

const LAT = 43.764315
const LON = -79.199

// Modal state
const isOpen = ref(false)
function openModal() {
  isOpen.value = true
}
function onKeyActivate(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    openModal()
  }
}

// Optional: settings click (stub)
function openSettings() {
  /* no-op for now */
}

// Reactive state
const loading = ref(true)
const error = ref('')
const current = ref(null) // { temp, code, isDay, windspeed, winddirection, time }
const daily = ref([]) // 14 days
const next48 = ref([]) // next 48 hours list
const lastUpdated = ref(null) // timestamp of last successful fetch

// Derived (widget header)
const currentText = computed(() => (current.value ? codeToText(current.value.code) : '—'))
const currentIcon = computed(() =>
  current.value ? codeToIcon(current.value.code, current.value.isDay) : 'fa-solid fa-cloud',
)
const currentTemp = computed(() => (current.value ? `${round(current.value.temp)}°C` : '—'))
const todayHi = computed(() => (daily.value.length ? `${round(daily.value[0].tMax)}°` : '—'))
const todayLo = computed(() => (daily.value.length ? `${round(daily.value[0].tMin)}°` : '—'))

// Fetch (loop-proof)
let fetching = false
async function fetchWeather() {
  if (fetching) return
  fetching = true
  loading.value = true
  error.value = ''
  try {
    const { data } = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: LAT,
        longitude: LON,
        current_weather: true,
        models: 'gfs_seamless',
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
        // Hourly variables (includes extra fields used in "Now")
        hourly: [
          'temperature_2m',
          'apparent_temperature',
          'precipitation_probability',
          'precipitation',
          'weathercode',
          'is_day',
          'windspeed_10m',
          'windgusts_10m',
          'winddirection_10m',
          'relative_humidity_2m',
          'uv_index',
          'pressure_msl',
          'surface_pressure',
          'visibility',
          'snow_depth',
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
        isDay: !!is_day,
        windspeed,
        winddirection,
        time,
      }
    } else {
      current.value = null
    }

    // daily (14 days)
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

    // hourly → next 48 hours list
    const h = data?.hourly || {}
    next48.value = []
    if (h.time?.length) {
      // align to current hour
      let idx = 0
      if (current.value?.time) {
        const curHour = current.value.time.slice(0, 13)
        const found = h.time.findIndex((t) => t.slice(0, 13) === curHour)
        idx = found >= 0 ? found : 0
      }
      const end = Math.min(idx + 48, h.time.length)
      for (let i = idx; i < end; i++) {
        next48.value.push({
          time: h.time[i],
          temp: h.temperature_2m?.[i],
          feels: h.apparent_temperature?.[i],
          code: h.weathercode?.[i],
          pprob: h.precipitation_probability?.[i],
          pamt: h.precipitation?.[i],
          isDay: h.is_day?.[i] === 1,
          ws: h.windspeed_10m?.[i],
          wg: h.windgusts_10m?.[i],
          wd: h.winddirection_10m?.[i],
          rh: h.relative_humidity_2m?.[i],
          uv: h.uv_index?.[i],
          // extras
          press: h.pressure_msl?.[i] ?? h.surface_pressure?.[i], // hPa
          vis: h.visibility?.[i], // meters
          snow: h.snow_depth?.[i], // meters
        })
      }
    }

    // mark successful update time
    lastUpdated.value = Date.now()
  } catch (e) {
    error.value = 'Unable to load weather right now.'
    console.error('Weather fetch failed:', e?.response?.data || e?.message || e)
  } finally {
    loading.value = false
    fetching = false
  }
}

// ⏱️ Auto-refresh every 5 minutes (and clean up)
let refreshTimer = null
onMounted(() => {
  fetchWeather()
  refreshTimer = setInterval(fetchWeather, 5 * 60 * 1000) // 300000 ms
})
onUnmounted(() => {
  if (refreshTimer) clearInterval(refreshTimer)
})
</script>

<template>
  <!-- WEATHER (clickable to open modal) -->
  <section
    class="glass rounded-md shadow-card px-5 pb-5 pt-2 w-full overflow-hidden cursor-pointer hover:ring-1 ring-accent/40 transition"
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
      <!-- UFC-style header -->
      <div
        class="sticky top-0 z-20 border-b border-white/10 bg-transparent -mx-5 px-4 pt-[1px] pb-2"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="flex flex-col">
            <h2 id="weather-title" class="card-title text-slate-100 font-semibold leading-tight">
              Scarborough Weather
            </h2>
            <div class="mt-1">
              <UpdatedAgo :at="lastUpdated" clickable :spinning="loading" @refresh="fetchWeather" />
            </div>
          </div>
          <button
            aria-label="Weather settings"
            class="shrink-0 p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40"
            type="button"
            @click.stop="openSettings"
          >
            <i class="fa-solid fa-gear text-base"></i>
          </button>
        </div>
      </div>

      <!-- Current summary -->
      <div class="flex items-center justify-between mb-4 mt-3">
        <div>
          <p class="text-slate-300 text-md">{{ currentText }}</p>
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
          :aria-label="`${fmtDay(d.date)}: ${codeToText(d.code)}, high ${round(d.tMax)}°, low ${round(d.tMin)}°`"
        >
          <p class="font-medium">{{ fmtDay(d.date) }}</p>
          <i :class="[codeToIcon(d.code, true)]" class="text-lg text-white" aria-hidden="true"></i>
          <p class="text-sm">{{ round(d.tMax) }}° / {{ round(d.tMin) }}°</p>
        </div>
      </div>
    </template>
  </section>

  <!-- Details Modal -->
  <WeatherDetailsModal
    v-model="isOpen"
    :current="current"
    :daily="daily"
    :next48="next48"
    :last-updated="lastUpdated"
  />
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
