<script setup>
</script>

<template>
    <!-- TO-DO (fills remainder; internal scroll) -->
    <section class="glass rounded-md shadow-card flex flex-col flex-1 min-h-0 w-full overflow-hidden" id="widget-todo">
        <!-- Header (sticky, title + plus button) -->
        <div class="sticky top-0 z-20 border-b border-white/10 bg-transparent px-4 py-2">
            <div class="flex items-center justify-between gap-3">
                <h2 class="card-title text-slate-100 font-semibold leading-tight">Tasks</h2>
                <button aria-label="Add task" class="shrink-0 p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40" type="button">
                    <i class="fa-solid fa-plus text-base"></i>
                </button>
            </div>
        </div>
        <!-- Scrollable task list (THIS is the scroller) -->
        <div class="scrollbar px-4 py-3 pb-4 overflow-auto min-h-0 flex-1">
            <h3 class="text-slate-200 font-semibold text-sm mb-2">Quick Tasks</h3>
            <ul class="space-y-2 mb-4">
                <li class="flex items-start gap-2"><input class="mt-1" type="checkbox" />
                    <p class="text-slate-100">Email daycare re: extended hours</p>
                </li>
                <li class="flex items-start gap-2"><input class="mt-1" type="checkbox" />
                    <p class="text-slate-100">Order moving boxes &amp; tape</p>
                </li>
            </ul>
            <h3 class="text-slate-200 font-semibold text-sm mb-2">Sell House — Prep</h3>
            <ul class="space-y-2 mb-4">
                <li class="flex items-start gap-2"><input class="mt-1" type="checkbox" />
                    <p class="text-slate-100">Declutter living room &amp; toy rotation</p>
                </li>
                <li class="flex items-start gap-2"><input class="mt-1" type="checkbox" />
                    <p class="text-slate-100">Patch/paint scuffs in hallway</p>
                </li>
                <li class="flex items-start gap-2"><input class="mt-1" type="checkbox" />
                    <p class="text-slate-100">Deep clean kitchen &amp; appliances</p>
                </li>
            </ul>
            <h3 class="text-slate-200 font-semibold text-sm mb-2">Sell House — Showings</h3>
            <div class="space-y-3 mb-4">
                <div class="rounded-lg p-3 border border-accent/30 bg-accent/15">
                    <h4 class="text-slate-200 font-medium text-sm mb-2">Pre-Showing Routine</h4>
                    <ul class="space-y-2">
                        <li class="flex items-start gap-2"><input class="mt-1" type="checkbox" />
                            <p class="text-slate-100">Hide countertop items; wipe surfaces</p>
                        </li>
                        <li class="flex items-start gap-2"><input class="mt-1" type="checkbox" />
                            <p class="text-slate-100">Tidy Sofia’s play area; stash bin in closet</p>
                        </li>
                        <li class="flex items-start gap-2"><input class="mt-1" type="checkbox" />
                            <p class="text-slate-100">Quick vacuum high-traffic paths</p>
                        </li>
                    </ul>
                </div>
                <div class="rounded-lg p-3 border border-accent/30 bg-accent/15">
                    <h4 class="text-slate-200 font-medium text-sm mb-2">During-Showing Kit</h4>
                    <ul class="space-y-2">
                        <li class="flex items-start gap-2"><input class="mt-1" type="checkbox" />
                            <p class="text-slate-100">Go-bag for Sofia (snack, water, wipes)</p>
                        </li>
                        <li class="flex items-start gap-2"><input class="mt-1" type="checkbox" />
                            <p class="text-slate-100">Leash &amp; treats for dogs</p>
                        </li>
                        <li class="flex items-start gap-2"><input class="mt-1" type="checkbox" />
                            <p class="text-slate-100">Docs &amp; valuables in car</p>
                        </li>
                    </ul>
                </div>
            </div>
            <h3 class="text-slate-200 font-semibold text-sm mb-2">Dashboard App — MVP</h3>
            <ul class="space-y-2 mb-4">
                <li class="flex items-start gap-2"><input class="mt-1" type="checkbox" />
                    <p class="text-slate-100">Wire To-Do storage shape</p>
                </li>
                <li class="flex items-start gap-2"><input class="mt-1" type="checkbox" />
                    <p class="text-slate-100">Add collapse/expand for groups</p>
                </li>
                <li class="flex items-start gap-2"><input class="mt-1" type="checkbox" />
                    <p class="text-slate-100">LocalStorage save/restore</p>
                </li>
            </ul>
            <h3 class="text-slate-200 font-semibold text-sm mb-2">Parenting / Daycare</h3>
            <ul class="space-y-2">
                <li class="flex items-start gap-2"><input class="mt-1" type="checkbox" />
                    <p class="text-slate-100">Prep weekly daycare bag (spare clothes, diapers, sunscreen)</p>
                </li>
                <li class="flex items-start gap-2"><input class="mt-1" type="checkbox" />
                    <p class="text-slate-100">Plan 3 easy weeknight dinners (toddler-friendly)</p>
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped></style>