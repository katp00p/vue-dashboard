<!-- src/components/shortcuts/SearchSettingsForm.vue -->
<script setup>
import { computed, onMounted } from 'vue'
import UiSelect from '../ui/UiSelect.vue'
import { useShortcutsStore, PROVIDER_OPTIONS } from '@/stores/shortcuts'

const store = useShortcutsStore()
onMounted(() => store.hydrate())

const providerModel = computed({
  get: () => store.provider,
  set: (v) => store.setProvider(v),
})

const openModeModel = computed({
  get: () => store.openMode,
  set: (v) => store.setOpenMode(v),
})

const OPEN_MODES = [
  { value: 'current', label: 'In current tab', icon: 'fa-regular fa-window-maximize' },
  { value: 'new', label: 'In new tab', icon: 'fa-solid fa-up-right-from-square' },
]
</script>

<template>
  <section class="space-y-3">
    <h3 class="text-sm font-medium text-slate-200">Search Settings</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <label class="text-sm text-slate-300 block">
        <span class="block mb-1">Default provider</span>
        <UiSelect
          v-model="providerModel"
          :options="PROVIDER_OPTIONS"
          aria-label="Default search provider"
        />
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
