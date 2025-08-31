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
} from '../../utils/weatherUtils'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  current: { type: Object, default: null },
  daily: { type: Array, default: () => [] },
  next24: { type: Array, default: () => [] },
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
</script>

<template>
  <TransitionRoot as="template" :show="modelValue">
    <Dialog as="div" class="relative z-50" @close="close">
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
                  @click="close"
                  class="text-slate-300 hover:text-slate-100 transition"
                  aria-label="Close"
                >
                  <i class="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>

              <!-- NOW -->
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
                    Feels like<br />
                    <span class="text-slate-100 font-semibold">
                      {{ daily[0]?.feelsMax != null ? Math.round(daily[0].feelsMax) : '—' }}° /
                      {{ daily[0]?.feelsMin != null ? Math.round(daily[0].feelsMin) : '—' }}°
                    </span>
                  </div>
                  <div class="text-slate-300">
                    Wind<br />
                    <span class="text-slate-100 font-semibold">
                      {{ current?.windspeed != null ? Math.round(current.windspeed) : '—' }} km/h
                    </span>
                  </div>
                  <div class="text-slate-300">
                    Precip chance<br />
                    <span class="text-slate-100 font-semibold"
                      >{{ daily[0]?.precipProbMax ?? '—' }}%</span
                    >
                  </div>
                  <div class="text-slate-300">
                    UV max today<br />
                    <span class="text-slate-100 font-semibold">{{ daily[0]?.uvMax ?? '—' }}</span>
                  </div>
                </div>
              </section>

              <!-- HOURLY -->
              <section class="mb-6">
                <p class="text-slate-400 text-[10px] uppercase tracking-wide mb-2">Next 24 hours</p>
                <div class="rounded-xl border border-white/15 bg-white/5 overflow-hidden">
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
                  <div class="max-h-48 overflow-y-auto divide-y divide-white/10">
                    <div
                      v-for="h in next24"
                      :key="h.time"
                      class="flex items-center px-3 py-2 text-[11px] leading-3 whitespace-nowrap tabular-nums"
                      :aria-label="`${fmtTime(h.time)}: ${codeToText(h.code)}, ${Math.round(h.temp ?? 0)}°C, precip ${h.pprob ?? 0}%`"
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

              <!-- TWO-WEEK -->
              <section>
                <p class="text-slate-400 text-xs uppercase tracking-wide mb-2">Two-week outlook</p>
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
::-webkit-scrollbar {
  height: 6px;
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background: rgba(148, 155, 161, 0.3);
  border-radius: 4px;
}
</style>
