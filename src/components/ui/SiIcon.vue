<script setup>
import { computed } from 'vue'
import { getSimpleIcon } from '@/icons/simpleIcons'

const props = defineProps({
    /** Simple Icons slug, e.g., 'google', 'duckduckgo', 'bing', 'perplexity' */
    name: { type: String, required: true },
    /** Optional <title> for accessibility tooltips */
    title: { type: String, default: '' },
    /** If true, sets role="img" instead of aria-hidden */
    decorative: { type: Boolean, default: false }
})

const icon = computed(() => getSimpleIcon(props.name))
</script>

<template>
    <!-- Inline SVG uses currentColor so Tailwind text-* controls the color -->
    <svg v-if="icon" viewBox="0 0 24 24" class="inline-block align-middle" :role="decorative ? 'img' : undefined" :aria-hidden="decorative ? undefined : 'true'" focusable="false">
        <title v-if="title">{{ title }}</title>
        <path :d="icon.path" fill="currentColor" />
    </svg>

    <!-- Fallback if slug not found -->
    <i v-else class="fa-solid fa-circle-question" aria-hidden="true"></i>
</template>
a