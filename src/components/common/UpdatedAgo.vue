<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  // Timestamp of last successful fetch
  at: { type: [Number, String, Date], default: null },
  // Text + icon
  prefix: { type: String, default: 'Updated' },
  icon: { type: String, default: 'fa-solid fa-rotate-right' },
  // Make it a button and emit events when clicked
  clickable: { type: Boolean, default: false },
  // Spin the icon while a refresh is in progress
  spinning: { type: Boolean, default: false },
  // Tooltip when clickable
  title: { type: String, default: 'Refresh' },
})

const emit = defineEmits(['click', 'refresh'])

const now = ref(Date.now())
let timer

function intervalFor(ms) {
  if (ms < 60_000) return 1000 // < 1 min → tick every second
  if (ms < 3_600_000) return 30_000 // < 1 hour → every 30s
  if (ms < 86_400_000) return 300_000 // < 1 day → every 5 min
  return 3_600_000 // ≥ 1 day → hourly
}

function startTimer() {
  stopTimer()
  const atMs = props.at ? new Date(props.at).getTime() : Date.now()
  let step = intervalFor(Date.now() - atMs)
  timer = setInterval(() => {
    now.value = Date.now()
    const nextStep = intervalFor(Date.now() - atMs)
    if (nextStep !== step) {
      step = nextStep
      startTimer()
    }
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

function handleClick() {
  emit('click')
  emit('refresh')
}
</script>

<template>
  <!-- If clickable, render a real <button> and stop propagation so parent click handlers don’t fire -->
  <component
    :is="clickable ? 'button' : 'span'"
    type="button"
    class="inline-flex items-center gap-2 text-xs text-slate-400"
    :class="
      clickable
        ? 'cursor-pointer hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/40 rounded px-1'
        : ''
    "
    aria-live="polite"
    :title="clickable ? title : null"
    @click.stop="clickable ? handleClick() : null"
  >
    <i :class="[icon, spinning ? 'fa-spin' : '']"></i>
    <span>{{ text }}</span>
  </component>
</template>
