<script setup>
import { Dialog, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { computed } from 'vue'
import {
  codeToText,
  codeToIcon,
  fmtTime,
  fmtHM,
  fmtDay,
  fmtDateShort,
  round,
  degToCompass,
  degToArrow,
} from '../../utils/weatherUtils'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  current: { type: Object, default: null },
  daily: { type: Array, default: () => [] },
  next48: { type: Array, default: () => [] }, // includes press/vis/snow
  lastUpdated: { type: [Number, String, Date], default: null },
})

const emit = defineEmits(['update:modelValue'])
function close() {
  emit('update:modelValue', false)
}

const currentText = computed(() => (props.current ? codeToText(props.current.code) : '—'))
const currentIcon = computed(() =>
  props.current ? codeToIcon(props.current.code, props.current.isDay) : 'fa-solid fa-cloud',
)
const currentTemp = computed(() => (props.current ? `${round(props.current.temp)}°C` : '—'))
const todayHi = computed(() => (props.daily.length ? `${round(props.daily[0].tMax)}°` : '—'))
const todayLo = computed(() => (props.daily.length ? `${round(props.daily[0].tMin)}°` : '—'))
const week1 = computed(() => props.daily.slice(0, 7))
const week2 = computed(() => props.daily.slice(7, 14))

// Use first hour in next48 as "now" detail source
const nowHour = computed(() => (props.next48 && props.next48.length ? props.next48[0] : null))

// Sunrise/Sunset/Day length
const sunrise = computed(() => props.daily?.[0]?.sunrise || null)
const sunset = computed(() => props.daily?.[0]?.sunset || null)
const dayLength = computed(() => {
  if (!sunrise.value || !sunset.value) return '—'
  const s = new Date(sunrise.value)
  const e = new Date(sunset.value)
  const ms = e - s
  if (!(ms > 0)) return '—'
  const h = Math.floor(ms / 3600000)
  const m = Math.round((ms % 3600000) / 60000)
  return `${h}h ${m}m`
})

// End-of-day markers
const isEndOfDay = (ts) => new Date(ts).getHours() === 23 // 11 PM
const isMidnight = (ts) => new Date(ts).getHours() === 0 // 12 AM
</script>

<template>
  <TransitionRoot :show="modelValue">
    <Dialog as="div" class="relative z-50" @close="close">
      <!-- Overlay -->
      <TransitionChild
        as="div"
        enter="ease-out duration-200"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-150"
        leave-from="opacity-100"
        leave-to="opacity-0"
        class="fixed inset-0 bg-black/60"
      />

      <!-- Panel -->
      <div class="fixed inset-0 overflow-y-auto" id="weather-details-modal">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="div"
            enter="ease-out duration-200"
            enter-from="opacity-0 translate-y-2 scale-95"
            enter-to="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-150"
            leave-from="opacity-100 translate-y-0 scale-100"
            leave-to="opacity-0 translate-y-2 scale-95"
            class="w-full max-w-5xl"
          >
            <DialogPanel class="glass rounded-2xl shadow-xl p-6 focus:outline-none">
              <!-- Header -->
              <div class="mb-3">
                <div class="flex items-start justify-between">
                  <h3 class="text-lg font-semibold text-slate-100">Weather details</h3>
                  <button
                    type="button"
                    @click="close"
                    class="text-slate-300 hover:text-slate-100 transition"
                    aria-label="Close"
                  >
                    <i class="fa-solid fa-xmark text-xl"></i>
                  </button>
                </div>
                <!-- Updated time -->
                <div>
                  <UpdatedAgo :at="lastUpdated" />
                </div>
              </div>

              <!-- NOW (expanded) -->
              <section class="mb-5 rounded-xl border border-white/20 bg-white/5 p-4">
                <!-- top row -->
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

                <!-- rich stats grid for "now" -->
                <div class="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-sm">
                  <div class="text-slate-300">
                    Feels like (now)<br />
                    <span class="text-slate-100 font-semibold">
                      {{ nowHour?.feels != null ? Math.round(nowHour.feels) : '—' }}°
                    </span>
                  </div>

                  <div class="text-slate-300">
                    Wind (now)<br />
                    <span class="text-slate-100 font-semibold">
                      {{ nowHour?.ws != null ? Math.round(nowHour.ws) : '—' }}
                    </span>
                    <span class="text-slate-500">/</span>
                    <span>{{ nowHour?.wg != null ? Math.round(nowHour.wg) : '—' }}</span>
                    <span v-if="nowHour?.wd != null" class="ml-1">
                      {{ degToCompass(nowHour.wd) }}
                      <span aria-hidden="true" class="text-slate-500">
                        {{ degToArrow(nowHour.wd) }}</span
                      >
                    </span>
                    <span class="text-slate-400"> km/h</span>
                  </div>

                  <div class="text-slate-300">
                    Humidity<br />
                    <span class="text-slate-100 font-semibold">
                      {{ nowHour?.rh != null ? Math.round(nowHour.rh) : '—' }}%
                    </span>
                  </div>

                  <div class="text-slate-300">
                    Precip chance<br />
                    <span class="text-slate-100 font-semibold"> {{ nowHour?.pprob ?? '—' }}% </span>
                  </div>

                  <div class="text-slate-300">
                    Precip amount<br />
                    <span class="text-slate-100 font-semibold">
                      {{ nowHour?.pamt != null ? nowHour.pamt.toFixed(1) : '—' }} mm
                    </span>
                  </div>

                  <div class="text-slate-300">
                    UV index (now)<br />
                    <span class="text-slate-100 font-semibold">
                      {{ nowHour?.uv != null ? Math.round(nowHour.uv) : '—' }}
                    </span>
                  </div>

                  <!-- New: Pressure / Visibility / Snow cover -->
                  <div class="text-slate-300">
                    Pressure (MSL)<br />
                    <span class="text-slate-100 font-semibold">
                      {{ nowHour?.press != null ? Math.round(nowHour.press) : '—' }} hPa
                    </span>
                  </div>

                  <div class="text-slate-300">
                    Visibility<br />
                    <span class="text-slate-100 font-semibold">
                      {{ nowHour?.vis != null ? (nowHour.vis / 1000).toFixed(1) : '—' }} km
                    </span>
                  </div>

                  <div class="text-slate-300">
                    Snow cover<br />
                    <span class="text-slate-100 font-semibold">
                      {{ nowHour?.snow != null ? Math.round(nowHour.snow * 100) : '—' }} cm
                    </span>
                  </div>

                  <div class="text-slate-300">
                    Sunrise<br />
                    <span class="text-slate-100 font-semibold">
                      {{ sunrise ? fmtHM(sunrise) : '—' }}
                    </span>
                  </div>

                  <div class="text-slate-300">
                    Sunset<br />
                    <span class="text-slate-100 font-semibold">
                      {{ sunset ? fmtHM(sunset) : '—' }}
                    </span>
                  </div>

                  <div class="text-slate-300">
                    Day length<br />
                    <span class="text-slate-100 font-semibold">{{ dayLength }}</span>
                  </div>
                </div>
              </section>

              <!-- Next 48 hours (unchanged) -->
              <section class="mb-6">
                <p class="text-slate-400 text-[10px] uppercase tracking-wide mb-2">Next 48 hours</p>

                <div class="rounded-xl border border-white/15 bg-white/5 overflow-hidden">
                  <!-- header (pad-right to match scrollbar gutter) -->
                  <div
                    class="flex items-center px-3 pr-[20px] py-1 text-[11px] text-slate-400 bg-white/5 leading-3 whitespace-nowrap"
                  >
                    <div class="w-[64px]">Time</div>
                    <div class="w-[20px] text-center">⛅</div>
                    <div class="flex-1">Desc</div>
                    <div class="w-[56px] text-center">Temp</div>
                    <div class="w-[56px] text-center">Feels</div>
                    <div class="w-[48px] text-center">💧%</div>
                    <div class="w-[44px] text-center">mm</div>
                    <div class="w-[44px] text-center">RH%</div>
                    <div class="w-[128px] text-center">Wind</div>
                  </div>

                  <!-- rows -->
                  <div class="max-h-48 overflow-y-auto divide-y divide-white/10">
                    <div
                      v-for="h in next48"
                      :key="h.time"
                      :class="[
                        'flex items-center px-3 py-2 text-sm leading-4 whitespace-nowrap tabular-nums',
                        isEndOfDay(h.time) ? 'border-b border-white' : '',
                        isMidnight(h.time) ? 'border-t-0' : '',
                      ]"
                      :aria-label="`${fmtTime(h.time)}: ${codeToText(h.code)}, ${Math.round(h.temp ?? 0)}°C, feels ${Math.round(h.feels ?? 0)}°C, precip ${h.pprob ?? 0}%, amount ${(h.pamt ?? 0).toFixed(1)} mm, RH ${Math.round(h.rh ?? 0)}%, wind ${Math.round(h.ws ?? 0)} km/h gust ${Math.round(h.wg ?? 0)} km/h from ${h.wd != null ? degToCompass(h.wd) : '—'}`"
                    >
                      <div class="w-[64px] text-slate-300">{{ fmtTime(h.time) }}</div>
                      <div class="w-[20px] text-center">
                        <i
                          :class="codeToIcon(h.code, h.isDay ?? true)"
                          class="text-[12px] text-white"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div class="flex-1 overflow-hidden text-ellipsis text-slate-400">
                        {{ codeToText(h.code) }}
                      </div>

                      <div class="w-[56px] flex justify-center text-slate-100 font-semibold">
                        {{ h.temp != null ? Math.round(h.temp) : '—' }}°
                      </div>
                      <div class="w-[56px] flex justify-center text-slate-300">
                        {{ h.feels != null ? Math.round(h.feels) : '—' }}°
                      </div>
                      <div class="w-[48px] flex justify-center text-slate-300">
                        {{ h.pprob ?? 0 }}%
                      </div>
                      <div class="w-[44px] flex justify-center text-slate-300">
                        {{ h.pamt != null ? h.pamt.toFixed(1) : '—' }}
                      </div>
                      <div class="w-[44px] flex justify-center text-slate-300">
                        {{ h.rh != null ? Math.round(h.rh) : '—' }}
                      </div>
                      <div class="w-[128px] flex justify-center text-slate-300">
                        <span class="text-slate-100">{{
                          h.ws != null ? Math.round(h.ws) : '—'
                        }}</span>
                        <span class="text-slate-500 mx-0.5">/</span>
                        <span>{{ h.wg != null ? Math.round(h.wg) : '—' }}</span>
                        <span v-if="h.wd != null" class="ml-1">
                          {{ degToCompass(h.wd) }}
                          <span aria-hidden="true" class="text-slate-500">
                            {{ degToArrow(h.wd) }}</span
                          >
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Two-week (unchanged) -->
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
