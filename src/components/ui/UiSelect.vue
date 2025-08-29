<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
    modelValue: { type: String, default: '' },
    // Options: [{ value: string, label: string, icon?: string }]
    options: { type: Array, default: () => [] },
    ariaLabel: { type: String, default: '' },
    // Allow icons on the left; will auto-disable padding if no icon is present
    showIconLeft: { type: Boolean, default: true }
})
const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const triggerRef = ref(null)
const listRef = ref(null)
const activeIndex = ref(-1)

const selectedIndex = computed(() =>
    props.options.findIndex(o => o.value === props.modelValue)
)
const selected = computed(() => props.options[selectedIndex.value] || null)
const selectedLabel = computed(() => selected.value?.label ?? 'Select…')
const selectedIcon = computed(() => selected.value?.icon || '')
const hasIconLeft = computed(() => props.showIconLeft && !!selectedIcon.value)

const idBase = Math.random().toString(36).slice(2, 8)
const listId = `listbox-${idBase}`

function openDropdown() {
    if (open.value) return
    open.value = true
    activeIndex.value = selectedIndex.value >= 0 ? selectedIndex.value : 0
    nextTick(() => {
        listRef.value?.focus()
        ensureActiveVisible()
    })
}
function closeDropdown(focusTrigger = true) {
    open.value = false
    if (focusTrigger) triggerRef.value?.focus()
}
function toggleDropdown() {
    open.value ? closeDropdown(false) : openDropdown()
}
function onSelect(idx) {
    const opt = props.options[idx]
    if (!opt) return
    emit('update:modelValue', opt.value)
    closeDropdown()
}

function onTriggerKeydown(e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); openDropdown() }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDropdown() }
}
function onListKeydown(e) {
    if (e.key === 'Escape') { e.preventDefault(); closeDropdown() }
    else if (e.key === 'ArrowDown') { e.preventDefault(); moveActive(1) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); moveActive(-1) }
    else if (e.key === 'Home') { e.preventDefault(); activeIndex.value = 0; ensureActiveVisible() }
    else if (e.key === 'End') { e.preventDefault(); activeIndex.value = props.options.length - 1; ensureActiveVisible() }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(activeIndex.value) }
}
function moveActive(delta) {
    const len = props.options.length
    if (!len) return
    let next = activeIndex.value + delta
    if (next < 0) next = 0
    if (next > len - 1) next = len - 1
    activeIndex.value = next
    ensureActiveVisible()
}
function ensureActiveVisible() {
    const list = listRef.value
    if (!list) return
    const el = list.querySelector(`[data-idx="${activeIndex.value}"]`)
    if (!el) return
    const elTop = el.offsetTop
    const elBottom = elTop + el.offsetHeight
    const viewTop = list.scrollTop
    const viewBottom = viewTop + list.clientHeight
    if (elTop < viewTop) list.scrollTop = elTop
    else if (elBottom > viewBottom) list.scrollTop = elBottom - list.clientHeight
}
function onDocClick(e) {
    if (!open.value) return
    const t = e.target
    if (triggerRef.value?.contains(t) || listRef.value?.contains(t)) return
    closeDropdown(false)
}
onMounted(() => document.addEventListener('mousedown', onDocClick))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDocClick))
</script>

<template>
    <div class="relative">
        <!-- Trigger -->
        <button ref="triggerRef" type="button" class="relative w-full rounded-md px-3 py-2 text-slate-100
             bg-slate-600 hover:bg-slate-500
             focus:outline-none focus:ring-2 focus:ring-[var(--ring)]
             flex items-center justify-between" :class="hasIconLeft ? 'pl-9' : ''" :aria-label="ariaLabel || undefined" :aria-haspopup="'listbox'" :aria-expanded="open ? 'true' : 'false'" :aria-controls="listId" @click="toggleDropdown" @keydown="onTriggerKeydown">
            <!-- Left icon like the searchbox -->
            <i v-if="hasIconLeft" :class="selectedIcon + ' absolute left-3 top-1/2 -translate-y-1/2 opacity-80'" aria-hidden="true"></i>

            <span class="truncate">{{ selectedLabel }}</span>
            <i class="fa-solid fa-chevron-down opacity-70 ml-3"></i>
        </button>

        <!-- Popup -->
        <div v-show="open" ref="listRef" :id="listId" role="listbox" tabindex="-1" class="absolute left-0 right-0 mt-1 z-50 rounded-md
             border border-slate-400 shadow-lg
             max-h-60 overflow-auto p-1
             bg-slate-600" @keydown="onListKeydown">
            <div v-for="(opt, idx) in options" :key="opt.value" :data-idx="idx" role="option" :aria-selected="modelValue === opt.value ? 'true' : 'false'" class="px-3 py-2 rounded text-slate-100 cursor-pointer
               hover:bg-slate-500 flex items-center gap-2 justify-between" :class="[
                idx === activeIndex ? 'bg-slate-500' : '',
                modelValue === opt.value ? 'ring-1 ring-slate-400' : ''
            ]" @mouseenter="activeIndex = idx" @click="onSelect(idx)">
                <div class="flex items-center gap-2 min-w-0">
                    <i v-if="opt.icon" :class="opt.icon + ' text-sm opacity-80'"></i>
                    <span class="truncate">{{ opt.label }}</span>
                </div>
                <i v-if="modelValue === opt.value" class="fa-solid fa-check text-xs text-slate-200"></i>
            </div>
        </div>
    </div>
</template>
