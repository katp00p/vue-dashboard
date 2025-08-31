<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  // Timestamp of last successful fetch: Date | number | ISO string
  at: { type: [Number, String, Date], default: null },
  // Optional text prefix
  prefix: { type: String, default: 'Updated' },
  // Optional Font Awesome icon class
  icon: { type: String, default: 'fa-solid fa-rotate-right' },
})

const now = ref(Date.now())
let timer

function intervalFor(ms) {
  if (ms < 60_000) return 1000 // every second < 1 min
  if (ms < 3_600_000) return 30_000 // every 30s < 1 hour
  if (ms < 86_400_000) return 300_000 // every 5 min < 1 day
  return 3_600_000 // hourly >= 1 day
}

function startTimer() {
  stopTimer()
  const atMs = props.at ? new Date(props.at).getTime() : Date.now()
  const step = intervalFor(Date.now() - atMs)
  timer = setInterval(() => {
    now.value = Date.now()
    // Adapt cadence as time since "at" grows
    const nextStep = intervalFor(Date.now() - atMs)
    if (nextStep !== step) startTimer()
  }, step)
}

function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(startTimer)
onUnmounted(stopTimer)
watch(() => props.at, startTimer)

const text = computed(() => {
  if (!props.at) return `${props.prefix} —`
  const atMs = new Date(props.at).getTime()
  if (Number.isNaN(atMs)) return `${props.prefix} —`
  const diff = Math.max(0, now.value - atMs)
  const s = Math.floor(diff / 1000)
  if (s < 60) return `${props.prefix} ${s} second${s !== 1 ? 's' : ''} ago`
  const m = Math.floor(s / 60)
  if (m < 60) return `${props.prefix} ${m} minute${m !== 1 ? 's' : ''} ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${props.prefix} ${h} hour${h !== 1 ? 's' : ''} ago`
  const d = Math.floor(h / 24)
  return `${props.prefix} ${d} day${d !== 1 ? 's' : ''} ago`
})
</script>

<template>
  <span class="inline-flex items-center gap-2 text-xs text-slate-400" aria-live="polite">
    <i :class="icon"></i>
    <span>{{ text }}</span>
  </span>
</template>
