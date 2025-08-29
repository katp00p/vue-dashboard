<script setup>
/**
 * Controlled inputs with two v-models:
 * - v-model:provider  -> "ChatGPT" | "Google" | "DuckDuckGo"
 * - v-model:openMode  -> "current" | "new"
 */
const props = defineProps({
    provider: { type: String, default: 'ChatGPT' },
    openMode: { type: String, default: 'current' }
})
const emit = defineEmits(['update:provider', 'update:openMode'])

const PROVIDERS = ['ChatGPT', 'Google', 'DuckDuckGo']
const OPEN_MODES = [
    { value: 'current', label: 'In current tab' },
    { value: 'new', label: 'In new tab' }
]

function onProviderChange(e) {
    emit('update:provider', e.target.value)
}
function onOpenModeChange(e) {
    emit('update:openMode', e.target.value)
}
</script>

<template>
    <section class="space-y-3">
        <h3 class="text-sm font-medium text-slate-200">Search Settings</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label class="text-sm text-slate-300">
                <span class="block mb-1">Default provider</span>
                <select :value="props.provider" @change="onProviderChange" class="w-full bg-white/5 rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]" aria-label="Default search provider">
                    <option v-for="p in PROVIDERS" :key="p" :value="p">{{ p }}</option>
                </select>
            </label>

            <label class="text-sm text-slate-300">
                <span class="block mb-1">Open results</span>
                <select :value="props.openMode" @change="onOpenModeChange" class="w-full bg-white/5 rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]" aria-label="Open results mode">
                    <option v-for="opt in OPEN_MODES" :key="opt.value" :value="opt.value">
                        {{ opt.label }}
                    </option>
                </select>
            </label>
        </div>
    </section>
</template>
