export function codeToText(code) {
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

export function codeToIcon(code, isDay = true) {
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

export function fmtDay(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString(undefined, { weekday: 'short' })
}

export function fmtDateShort(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function fmtTime(ts) {
  const d = new Date(ts)
  return d.toLocaleTimeString(undefined, { hour: 'numeric' })
}

export function fmtHM(ts) {
  const d = new Date(ts)
  return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
}

export function round(n) {
  return typeof n === 'number' ? Math.round(n) : n
}

/* === NEW: wind direction helpers === */
export function degToCompass(deg) {
  if (typeof deg !== 'number' || isNaN(deg)) return '—'
  const dirs = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ]
  const ix = Math.round(deg / 22.5) % 16
  return dirs[ix]
}

export function degToArrow(deg) {
  if (typeof deg !== 'number' || isNaN(deg)) return ''
  const arrows = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'] // 0=N, 90=E, etc.
  const ix = Math.round(deg / 45) % 8
  return arrows[ix]
}
