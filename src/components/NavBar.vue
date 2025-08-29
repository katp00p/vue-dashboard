<script setup>
</script>

<template>
    <header class="w-full" id="header">
        <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
            <!-- Reduced margins: use max-w-[95%] instead of a fixed canvas -->
            <div class="mx-auto max-w-[95%] px-2 h-14 flex items-center justify-between">
                <!-- Brand -->
                <div class="flex items-center gap-3" id="brand">
                    <!-- Gradient box with brown poop icon -->
                    <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg" style="background: linear-gradient(135deg, #3b87a8, #6db187);">
                        <i class="fa-solid fa-poop text-lg" style="color: saddlebrown;"></i>
                    </span>
                    <span class="text-slate-800 text-lg tracking-tight">
                        Shit &amp; Stuff
                    </span>
                </div>
                <!-- Right-side Actions (just gear icon now) -->
                <div class="flex items-center" id="header-actions">
                    <button class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100" title="Settings">
                        <i class="fa-solid fa-gear"></i>
                    </button>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped></style>