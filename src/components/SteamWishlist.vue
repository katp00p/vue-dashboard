<script setup>
</script>

<template>
    <!-- === Steam Wishlist (fills remaining height; header only for now) === -->
    <section class="glass rounded-md shadow-card flex flex-col overflow-hidden flex-1 min-h-0" id="widget-steam">
        <!-- Header -->
        <div class="sticky top-0 z-20 border-b border-white/10 bg-transparent px-4 py-2">
            <div class="flex items-start justify-between gap-3">
                <div class="flex flex-col">
                    <h2 class="card-title text-slate-100 font-semibold leading-tight">Steam Wishlist</h2>
                    <div class="mt-1 flex items-center gap-2 text-xs text-slate-400">
                        <i class="fa-solid fa-rotate-right"></i><span>Updated just now</span>
                    </div>
                </div>
                <button aria-label="Steam settings" class="shrink-0 p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40" type="button">
                    <i class="fa-solid fa-gear text-base"></i>
                </button>
            </div>
        </div>
        <!-- Inner scroller -->
        <!-- Scrollable list of games on sale -->
        <div class="scrollbar scrollbar--accent scrollbar--thin flex-1 min-h-0 overflow-y-scroll p-4">
            <table class="w-full table-auto text-slate-200">
                <thead class="sticky top-0 z-10 bg-transparent border-b border-white/10">
                    <tr class="text-xs text-slate-300">
                        <th class="text-left font-semibold py-2.5 px-2 sm:px-3">Game</th>
                        <th class="text-center font-semibold py-2.5 px-2 sm:px-3 w-20">Sale</th> <!-- centered -->
                        <th class="text-center font-semibold py-2.5 px-2 sm:px-3 w-28">Original</th> <!-- centered -->
                        <th class="text-right font-semibold py-2.5 px-2 sm:px-3 w-28">Now</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/10">
                    <tr class="hover:bg-white/5 transition">
                        <td class="py-2.5 px-2 sm:px-3"><span class="block truncate">Stellaris: Galactic Paradox</span></td>
                        <td class="py-2.5 px-2 sm:px-3 text-center"><span class="inline-block px-2 py-0.5 rounded bg-accent/20 border border-accent/30">30%</span></td>
                        <td class="py-2.5 px-2 sm:px-3 text-center text-slate-400 line-through num">$39.99</td>
                        <td class="py-2.5 px-2 sm:px-3 text-right font-semibold num">$27.99</td>
                    </tr>
                    <tr class="hover:bg-white/5 transition">
                        <td class="py-2.5 px-2 sm:px-3"><span class="block truncate">Hollow Knight: Silksong</span></td>
                        <td class="py-2.5 px-2 sm:px-3 text-center"><span class="inline-block px-2 py-0.5 rounded bg-accent/20 border border-accent/30">20%</span></td>
                        <td class="py-2.5 px-2 sm:px-3 text-center text-slate-400 line-through num">$29.99</td>
                        <td class="py-2.5 px-2 sm:px-3 text-right font-semibold num">$23.99</td>
                    </tr>
                    <tr class="hover:bg-white/5 transition">
                        <td class="py-2.5 px-2 sm:px-3"><span class="block truncate">Baldur’s Gate 3</span></td>
                        <td class="py-2.5 px-2 sm:px-3 text-center"><span class="inline-block px-2 py-0.5 rounded bg-accent/20 border border-accent/30">10%</span></td>
                        <td class="py-2.5 px-2 sm:px-3 text-center text-slate-400 line-through num">$79.99</td>
                        <td class="py-2.5 px-2 sm:px-3 text-right font-semibold num">$71.99</td>
                    </tr>
                    <tr class="hover:bg-white/5 transition">
                        <td class="py-2.5 px-2 sm:px-3"><span class="block truncate">Elden Ring: Shadow of the Erdtree</span></td>
                        <td class="py-2.5 px-2 sm:px-3 text-center"><span class="inline-block px-2 py-0.5 rounded bg-accent/20 border border-accent/30">30%</span></td>
                        <td class="py-2.5 px-2 sm:px-3 text-center text-slate-400 line-through num">$59.99</td>
                        <td class="py-2.5 px-2 sm:px-3 text-right font-semibold num">$41.99</td>
                    </tr>
                    <tr class="hover:bg-white/5 transition">
                        <td class="py-2.5 px-2 sm:px-3"><span class="block truncate">Sea of Stars</span></td>
                        <td class="py-2.5 px-2 sm:px-3 text-center"><span class="inline-block px-2 py-0.5 rounded bg-accent/20 border border-accent/30">25%</span></td>
                        <td class="py-2.5 px-2 sm:px-3 text-center text-slate-400 line-through num">$34.99</td>
                        <td class="py-2.5 px-2 sm:px-3 text-right font-semibold num">$26.24</td>
                    </tr>
                    <tr class="hover:bg-white/5 transition">
                        <td class="py-2.5 px-2 sm:px-3"><span class="block truncate">Deep Rock Galactic</span></td>
                        <td class="py-2.5 px-2 sm:px-3 text-center"><span class="inline-block px-2 py-0.5 rounded bg-accent/20 border border-accent/30">60%</span></td>
                        <td class="py-2.5 px-2 sm:px-3 text-center text-slate-400 line-through num">$29.99</td>
                        <td class="py-2.5 px-2 sm:px-3 text-right font-semibold num">$11.99</td>
                    </tr>
                    <tr class="hover:bg-white/5 transition">
                        <td class="py-2.5 px-2 sm:px-3"><span class="block truncate">Hades II</span></td>
                        <td class="py-2.5 px-2 sm:px-3 text-center"><span class="inline-block px-2 py-0.5 rounded bg-accent/20 border border-accent/30">35%</span></td>
                        <td class="py-2.5 px-2 sm:px-3 text-center text-slate-400 line-through num">$39.99</td>
                        <td class="py-2.5 px-2 sm:px-3 text-right font-semibold num">$25.99</td>
                    </tr>
                    <tr class="hover:bg-white/5 transition">
                        <td class="py-2.5 px-2 sm:px-3"><span class="block truncate">Cyberpunk 2077: Phantom Liberty</span></td>
                        <td class="py-2.5 px-2 sm:px-3 text-center"><span class="inline-block px-2 py-0.5 rounded bg-accent/20 border border-accent/30">15%</span></td>
                        <td class="py-2.5 px-2 sm:px-3 text-center text-slate-400 line-through num">$19.99</td>
                        <td class="py-2.5 px-2 sm:px-3 text-right font-semibold num">$16.99</td>
                    </tr>
                    <tr class="hover:bg-white/5 transition">
                        <td class="py-2.5 px-2 sm:px-3"><span class="block truncate">Dave the Diver</span></td>
                        <td class="py-2.5 px-2 sm:px-3 text-center"><span class="inline-block px-2 py-0.5 rounded bg-accent/20 border border-accent/30">50%</span></td>
                        <td class="py-2.5 px-2 sm:px-3 text-center text-slate-400 line-through num">$39.99</td>
                        <td class="py-2.5 px-2 sm:px-3 text-right font-semibold num">$20.00</td>
                    </tr>
                    <tr class="hover:bg-white/5 transition">
                        <td class="py-2.5 px-2 sm:px-3"><span class="block truncate">Vampire Survivors</span></td>
                        <td class="py-2.5 px-2 sm:px-3 text-center"><span class="inline-block px-2 py-0.5 rounded bg-accent/20 border border-accent/30">15%</span></td>
                        <td class="py-2.5 px-2 sm:px-3 text-center text-slate-400 line-through num">$4.99</td>
                        <td class="py-2.5 px-2 sm:px-3 text-right font-semibold num">$4.24</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<style scoped></style>