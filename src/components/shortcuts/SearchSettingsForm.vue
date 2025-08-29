<script setup>
import { computed } from 'vue'
import UiSelect from '../ui/UiSelect.vue'

const props = defineProps({
    provider: { type: String, default: 'ChatGPT' },
    openMode: { type: String, default: 'current' }
})
const emit = defineEmits(['update:provider', 'update:openMode'])

const providerModel = computed({
    get: () => props.provider,
    set: (v) => emit('update:provider', v)
})
const openModeModel = computed({
    get: () => props.openMode,
    set: (v) => emit('update:openMode', v)
})

const PROVIDERS = [
    { value: 'ChatGPT', label: 'ChatGPT', icon: 'fa-solid fa-robot' },
    { value: 'Google', label: 'Google', icon: 'fa-brands fa-google' },
    { value: 'DuckDuckGo', label: 'DuckDuckGo', icon: 'fa-solid fa-magnifying-glass' }
]
const OPEN_MODES = [
    { value: 'current', label: 'In current tab', icon: 'fa-regular fa-window-maximize' },
    { value: 'new', label: 'In new tab', icon: 'fa-solid fa-up-right-from-square' }
]
</script>

<template>
    <section class="space-y-3">
        <h3 class="text-sm font-medium text-slate-200">Search Settings</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label class="text-sm text-slate-300 block">
                <span class="block mb-1">Default provider</span>
                <UiSelect v-model="providerModel" :options="PROVIDERS" aria-label="Default search provider" />
            </label>

            <label class="text-sm text-slate-300 block">
                <span class="block mb-1">Open results</span>
                <UiSelect v-model="openModeModel" :options="OPEN_MODES" aria-label="Open results mode" />
            </label>
        </div>
    </section>
</template>

<style scoped>
/* none */
</style>
