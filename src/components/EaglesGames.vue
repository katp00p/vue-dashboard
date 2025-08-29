<script setup>
</script>

<template>
    <section class="glass rounded-md shadow-card shrink-0 flex flex-col overflow-hidden" id="widget-eagles">
        <div class="sticky top-0 z-20 border-b border-white/10 bg-transparent px-4 py-2">
            <div class="flex items-start justify-between gap-3">
                <div class="flex flex-col">
                    <h2 class="card-title text-slate-100 font-semibold leading-tight">Philadelphia Eagles Games</h2>
                    <div class="mt-1 flex items-center gap-2 text-xs text-slate-400">
                        <i class="fa-solid fa-rotate-right"></i><span>Updated just now</span>
                    </div>
                </div>
                <button aria-label="Eagles settings" class="shrink-0 p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40" type="button">
                    <i class="fa-solid fa-gear text-base"></i>
                </button>
            </div>
        </div>
        <!-- Buttons + Centered content (matches UFC layout) -->
        <div class="mt-2 pb-5 px-4 pt-3 grid grid-cols-[1.5rem,1fr,1.5rem] md:grid-cols-[1.75rem,1fr,1.75rem] items-stretch gap-2">
            <!-- Left button (disabled for first game) -->
            <div class="flex">
                <button aria-disabled="true" class="h-full w-4 md:w-5 rounded-sm border border-white/10 bg-white/10 text-slate-200/90 flex items-center justify-center hover:bg-white/20 transition disabled:opacity-30 disabled:cursor-not-allowed" disabled="" title="Previous game">
                    <i class="fa-solid fa-play rotate-180 text-[9px] md:text-[10px]"></i>
                </button>
            </div>
            <!-- Center content -->
            <div class="px-4 pt-3 pb-5 text-center">
                <!-- Week label -->
                <div class="mt-1 text-slate-300 text-sm md:text-base">Week 7</div>
                <!-- Matchup with logos (home on the right) -->
                <div class="text-white text-2xl md:text-3xl font-semibold tracking-[0.03em]">
                    <div class="flex items-center justify-center gap-3 md:gap-4">
                        <!-- Visitor logo -->
                        <img alt="Giants" class="h-7 w-7 md:h-8 md:w-8 object-contain drop-shadow-sm" onerror="this.replaceWith(Object.assign(document.createElement('i'),{className:'fa-solid fa-star text-white/70'}));" />
                        <span>Cowboys</span>
                        <span class="align-baseline text-sm md:text-base font-normal opacity-80 mx-1.5 tracking-normal">@</span>
                        <span>Eagles</span>
                        <!-- Home logo -->
                        <img alt="Eagles" class="h-7 w-7 md:h-8 md:w-8 object-contain drop-shadow-sm" onerror="this.replaceWith(Object.assign(document.createElement('i'),{className:'fa-solid fa-dove text-white/70'}));" />
                    </div>
                </div>
                <!-- Location -->
                <div class="mt-1 text-slate-300 text-sm md:text-base">
                    Lincoln Financial Field — Philadelphia, PA
                </div>
                <!-- Date -->
                <div class="mt-2 mb-5 text-slate-300 italic text-[11px] md:text-xs">
                    Sun, Oct 12, 2025
                </div>
                <!-- Countdown (no glass) -->
                <div class="text-xl md:text-2xl font-semibold text-white" data-event-date="2025-10-12T13:00:00-04:00" id="eagles-countdown">
                    21d 06h 00m
                </div>
            </div>
            <!-- Right button -->
            <div class="flex justify-end">
                <button class="h-full w-4 md:w-5 rounded-sm border border-white/10 bg-white/10 text-slate-200/90 flex items-center justify-center hover:bg-white/20 transition" title="Next game">
                    <i class="fa-solid fa-play text-[9px] md:text-[10px]"></i>
                </button>
            </div>
        </div>
    </section>
</template>

<style scoped></style>