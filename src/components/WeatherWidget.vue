<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// ==== Location (your coords) ====
const LAT = 43.764315
const LON = -79.199

// ==== Reactive state ====
const loading = ref(true)
const error = ref('')
const current = ref(null) // { temp, code, isDay }
const daily = ref([]) // [{ date, tMax, tMin, code }...]

// ==== Helpers: weather code → text/icon ====
// Based on Open-Meteo weather codes: https://open-meteo.com/en/docs
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
  // Choose a sensible Font Awesome icon for each bucket (solid set).
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
  const d = new Date(dateStr + 'T00:00:00') // safe for local display
  return d.toLocaleDateString(undefined, { weekday: 'short' })
}

function round(n) {
  return typeof n === 'number' ? Math.round(n) : n
}

// ==== Derived values ====
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

    // current
    if (data?.current_weather) {
      const { temperature, weathercode, is_day } = data.current_weather
      current.value = {
        temp: temperature,
        code: weathercode,
        isDay: Boolean(is_day),
      }
    }

    // daily
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
    // Optional: console.error for dev only
    // console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(fetchWeather)
</script>

<template>
  <!-- WEATHER -->
  <section
    class="glass rounded-md shadow-card p-5 w-full overflow-hidden"
    id="widget-weather"
    aria-labelledby="weather-title"
  >
    <!-- Header / Current -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 id="weather-title" class="card-title text-slate-100 font-semibold tracking-wide">
          Scarborough Weather
        </h2>
        <p class="text-slate-300 text-sm">
          <span v-if="loading">Loading…</span>
          <span v-else-if="error">{{ error }}</span>
          <span v-else>{{ currentText }}</span>
        </p>
      </div>

      <div class="flex items-center gap-3">
        <i :class="[currentIcon]" class="text-4xl text-white" aria-hidden="true"></i>
        <div class="text-right">
          <p class="text-3xl font-bold text-white leading-tight">
            <span v-if="loading">—</span>
            <span v-else>{{ currentTemp }}</span>
          </p>
          <p class="text-slate-300 text-sm leading-tight">
            <span v-if="loading">H: — / L: —</span>
            <span v-else>H: {{ todayHi }} / L: {{ todayLo }}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- 7-Day Forecast -->
    <div class="grid grid-cols-7 gap-3 text-center text-slate-300 text-sm mt-3" role="list">
      <div
        v-for="(d, idx) in daily"
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
  </section>
</template>

<style scoped>
/* Optional micro-polish: ensure icon/text alignment feels crisp on dark bg */
#widget-weather .card-title {
  letter-spacing: 0.02em;
}
</style>
