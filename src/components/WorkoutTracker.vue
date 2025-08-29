<script setup>
</script>

<template>
    <!-- === Workout Tracker (header + gear, no legend) === -->
    <section class="glass rounded-md shadow-card flex flex-col overflow-hidden" id="widget-workout">
        <!-- Header -->
        <div class="sticky top-0 z-20 border-b border-white/10 bg-transparent px-4 py-2">
            <div class="flex items-start justify-between gap-3">
                <div class="flex flex-col">
                    <h2 class="card-title text-slate-100 font-semibold leading-tight">Workout Tracker</h2>
                    <!-- keep month/year instead of "Updated just now" -->
                    <div class="mt-1 text-xs text-white/80">August 2025</div>
                </div>
                <!-- Gear (replaces the old legend area) -->
                <button aria-label="Workout settings" class="shrink-0 p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40" type="button">
                    <i class="fa-solid fa-gear text-base"></i>
                </button>
            </div>
        </div>
        <!-- Compact calendar: fixed short height, 6 equal rows x 7 days (Mon start) -->
        <div class="mt-1 p-4 h-56 md:h-64 grid grid-cols-7 grid-rows-6 gap-1">
            <!-- Row 1: July 28–31 (muted, outside-month), then Aug 1–3 -->
            <!-- Mon Jul 28 — LIFT (muted green bg + grey icon) -->
            <div class="rounded-md bg-green-500/10 border border-green-400/20 relative flex items-center justify-center p-1.5">
                <span class="absolute top-1 right-1 text-[10px] text-slate-400/80">28</span>
                <i class="fa-solid fa-dumbbell text-slate-300/60 text-lg"></i>
            </div>
            <!-- Tue Jul 29 — RIDE (muted blue bg + grey icon) -->
            <div class="rounded-md bg-blue-500/10 border border-blue-400/20 relative flex items-center justify-center p-1.5">
                <span class="absolute top-1 right-1 text-[10px] text-slate-400/80">29</span>
                <i class="fa-solid fa-bicycle text-slate-300/60 text-lg"></i>
            </div>
            <!-- Wed Jul 30 — LIFT (muted) -->
            <div class="rounded-md bg-green-500/10 border border-green-400/20 relative flex items-center justify-center p-1.5">
                <span class="absolute top-1 right-1 text-[10px] text-slate-400/80">30</span>
                <i class="fa-solid fa-dumbbell text-slate-300/60 text-lg"></i>
            </div>
            <!-- Thu Jul 31 — RIDE (muted) -->
            <div class="rounded-md bg-blue-500/10 border border-blue-400/20 relative flex items-center justify-center p-1.5">
                <span class="absolute top-1 right-1 text-[10px] text-slate-400/80">31</span>
                <i class="fa-solid fa-bicycle text-slate-300/60 text-lg"></i>
            </div>
            <!-- Fri Aug 1 — LIFT -->
            <div class="rounded-md bg-green-500/20 border border-green-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">1</span>
                <i class="fa-solid fa-dumbbell text-white/85 text-lg"></i>
            </div>
            <!-- Sat 2 — REST -->
            <div class="rounded-md bg-yellow-500/20 border border-yellow-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">2</span>
                <i class="fa-regular fa-moon text-white/80 text-lg"></i>
            </div>
            <!-- Sun 3 — REST -->
            <div class="rounded-md bg-yellow-500/20 border border-yellow-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">3</span>
                <i class="fa-regular fa-moon text-white/80 text-lg"></i>
            </div>
            <!-- Row 2: Aug 4–10 (missed Thu ride, rode Sun instead) -->
            <!-- Mon 4 — LIFT -->
            <div class="rounded-md bg-green-500/20 border border-green-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">4</span>
                <i class="fa-solid fa-dumbbell text-white/85 text-lg"></i>
            </div>
            <!-- Tue 5 — RIDE -->
            <div class="rounded-md bg-blue-500/20 border border-blue-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">5</span>
                <i class="fa-solid fa-bicycle text-white/85 text-lg"></i>
            </div>
            <!-- Wed 6 — LIFT -->
            <div class="rounded-md bg-green-500/20 border border-green-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">6</span>
                <i class="fa-solid fa-dumbbell text-white/85 text-lg"></i>
            </div>
            <!-- Thu 7 — REST (missed ride) -->
            <div class="rounded-md bg-yellow-500/20 border border-yellow-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">7</span>
                <i class="fa-regular fa-moon text-white/80 text-lg"></i>
            </div>
            <!-- Fri 8 — LIFT -->
            <div class="rounded-md bg-green-500/20 border border-green-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">8</span>
                <i class="fa-solid fa-dumbbell text-white/85 text-lg"></i>
            </div>
            <!-- Sat 9 — REST -->
            <div class="rounded-md bg-yellow-500/20 border border-yellow-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">9</span>
                <i class="fa-regular fa-moon text-white/80 text-lg"></i>
            </div>
            <!-- Sun 10 — RIDE (made up) -->
            <div class="rounded-md bg-blue-500/20 border border-blue-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">10</span>
                <i class="fa-solid fa-bicycle text-white/85 text-lg"></i>
            </div>
            <!-- Row 3: Aug 11–17 (missed Wed lift) -->
            <!-- Mon 11 — LIFT -->
            <div class="rounded-md bg-green-500/20 border border-green-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">11</span>
                <i class="fa-solid fa-dumbbell text-white/85 text-lg"></i>
            </div>
            <!-- Tue 12 — RIDE -->
            <div class="rounded-md bg-blue-500/20 border border-blue-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">12</span>
                <i class="fa-solid fa-bicycle text-white/85 text-lg"></i>
            </div>
            <!-- Wed 13 — REST (missed lift) -->
            <div class="rounded-md bg-yellow-500/20 border border-yellow-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">13</span>
                <i class="fa-regular fa-moon text-white/80 text-lg"></i>
            </div>
            <!-- Thu 14 — LIFT -->
            <div class="rounded-md bg-green-500/20 border border-green-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">14</span>
                <i class="fa-solid fa-dumbbell text-white/85 text-lg"></i>
            </div>
            <!-- Fri 15 — LIFT -->
            <div class="rounded-md bg-green-500/20 border border-green-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">15</span>
                <i class="fa-solid fa-dumbbell text-white/85 text-lg"></i>
            </div>
            <!-- Sat 16 — REST -->
            <div class="rounded-md bg-yellow-500/20 border border-yellow-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">16</span>
                <i class="fa-regular fa-moon text-white/80 text-lg"></i>
            </div>
            <!-- Sun 17 — REST -->
            <div class="rounded-md bg-yellow-500/20 border border-yellow-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">17</span>
                <i class="fa-regular fa-moon text-white/80 text-lg"></i>
            </div>
            <!-- Row 4: Aug 18–24 (one sick day midweek) -->
            <!-- Mon 18 — LIFT -->
            <div class="rounded-md bg-green-500/20 border border-green-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">18</span>
                <i class="fa-solid fa-dumbbell text-white/85 text-lg"></i>
            </div>
            <!-- Tue 19 — RIDE -->
            <div class="rounded-md bg-blue-500/20 border border-blue-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">19</span>
                <i class="fa-solid fa-bicycle text-white/85 text-lg"></i>
            </div>
            <!-- Wed 20 — SICK/OTHER -->
            <div class="rounded-md bg-red-500/20 border border-red-400/30 relative flex items-center justify-center p-2" title="Sick / Injury / Other">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">20</span>
                <i class="fa-solid fa-triangle-exclamation text-white/90 text-lg"></i>
            </div>
            <!-- Thu 21 — REST -->
            <div class="rounded-md bg-yellow-500/20 border border-yellow-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">21</span>
                <i class="fa-regular fa-moon text-white/80 text-lg"></i>
            </div>
            <!-- Fri 22 — LIFT -->
            <div class="rounded-md bg-green-500/20 border border-green-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">22</span>
                <i class="fa-solid fa-dumbbell text-white/85 text-lg"></i>
            </div>
            <!-- Sat 23 — RIDE -->
            <div class="rounded-md bg-blue-500/20 border border-blue-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">23</span>
                <i class="fa-solid fa-bicycle text-white/85 text-lg"></i>
            </div>
            <!-- Sun 24 — REST -->
            <div class="rounded-md bg-yellow-500/20 border border-yellow-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">24</span>
                <i class="fa-regular fa-moon text-white/80 text-lg"></i>
            </div>
            <!-- Row 5: Aug 25–31 (no icons from 28 onward) -->
            <!-- Mon 25 — LIFT -->
            <div class="rounded-md bg-green-500/20 border border-green-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">25</span>
                <i class="fa-solid fa-dumbbell text-white/85 text-lg"></i>
            </div>
            <!-- Tue 26 — RIDE -->
            <div class="rounded-md bg-blue-500/20 border border-blue-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">26</span>
                <i class="fa-solid fa-bicycle text-white/85 text-lg"></i>
            </div>
            <!-- Wed 27 — REST -->
            <div class="rounded-md bg-yellow-500/20 border border-yellow-400/30 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">27</span>
                <i class="fa-regular fa-moon text-white/80 text-lg"></i>
            </div>
            <!-- Thu 28 — TODAY (no icon) -->
            <div class="rounded-md bg-white/5 relative flex items-center justify-center p-2" title="Today">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">28</span>
            </div>
            <!-- Fri 29 — future (no icon) -->
            <div class="rounded-md bg-white/5 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">29</span>
            </div>
            <!-- Sat 30 — future (no icon) -->
            <div class="rounded-md bg-white/5 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">30</span>
            </div>
            <!-- Sun 31 — future (no icon) -->
            <div class="rounded-md bg-white/5 relative flex items-center justify-center p-2">
                <span class="absolute top-1 right-1 text-[10px] text-slate-300">31</span>
            </div>
            <!-- Row 6: Sept 1–7 placeholders (future, muted, no icons) -->
            <div class="rounded-md bg-white/5 relative flex items-center justify-center p-1.5"><span class="absolute top-1 right-1 text-[10px] text-slate-400/70">1</span></div>
            <div class="rounded-md bg-white/5 relative flex items-center justify-center p-1.5"><span class="absolute top-1 right-1 text-[10px] text-slate-400/70">2</span></div>
            <div class="rounded-md bg-white/5 relative flex items-center justify-center p-1.5"><span class="absolute top-1 right-1 text-[10px] text-slate-400/70">3</span></div>
            <div class="rounded-md bg-white/5 relative flex items-center justify-center p-1.5"><span class="absolute top-1 right-1 text-[10px] text-slate-400/70">4</span></div>
            <div class="rounded-md bg-white/5 relative flex items-center justify-center p-1.5"><span class="absolute top-1 right-1 text-[10px] text-slate-400/70">5</span></div>
            <div class="rounded-md bg-white/5 relative flex items-center justify-center p-1.5"><span class="absolute top-1 right-1 text-[10px] text-slate-400/70">6</span></div>
            <div class="rounded-md bg-white/5 relative flex items-center justify-center p-1.5"><span class="absolute top-1 right-1 text-[10px] text-slate-400/70">7</span></div>
        </div>
    </section>
</template>

<style scoped></style>