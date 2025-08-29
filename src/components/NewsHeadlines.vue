<script setup>
</script>

<template>
    <!-- Header (sticky, stacked title + subtext, gear on right) -->
    <div class="sticky top-0 z-20 border-b border-white/10 bg-transparent px-4 py-3">
        <div class="flex items-start justify-between gap-3">
            <!-- Left: title + updated -->
            <div class="flex flex-col">
                <h2 class="card-title text-slate-100 font-semibold tracking-wide leading-tight">
                    Latest Headlines
                </h2>
                <div class="mt-1 flex items-center gap-2 text-xs text-slate-400">
                    <i class="fa-solid fa-rotate-right"></i>
                    <span>Updated just now</span>
                </div>
            </div>
            <!-- Right: settings button -->
            <button aria-label="News settings" class="shrink-0 p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40" type="button">
                <i class="fa-solid fa-gear text-base"></i>
            </button>
        </div>
    </div>
    <!-- Scroll area -->
    <div class="news-scroll scrollbar flex-1 min-h-0 overflow-y-scroll p-4">
        <!-- FEATURED lead (with image) -->
        <article class="rounded-md border border-white/10 overflow-hidden mb-5">
            <figure class="relative h-40 md:h-48 w-full">
                <!-- Image -->
                <img alt="Illustration of an exoplanet and starfield" class="h-full w-full object-cover" decoding="async" loading="lazy" src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&amp;fit=crop&amp;w=1600&amp;q=60" />
                <!-- Readability overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent"></div>
                <!-- Headline + meta on image -->
                <div class="absolute bottom-2 left-2 right-2">
                    <a class="block text-lg md:text-xl font-semibold text-white drop-shadow hover:underline" href="#">
                        NASA confirms Earth-like exoplanet; new mission slated for 2027
                    </a>
                    <div class="mt-1 text-[12px] text-slate-200/90">45m ago · NASA / Science Desk</div>
                </div>
                <!-- Category pill (optional, on image) -->
                <div class="absolute top-2 left-2">
                    <span class="px-2 py-0.5 rounded-full bg-white/15 border border-white/25 text-[11px] uppercase tracking-wider text-white/95">
                        Science
                    </span>
                </div>
            </figure>
            <!-- Footer bar (matches your style from #2) -->
            <div class="bg-black/20 px-3 py-2 flex items-center justify-between gap-3 text-[12px] text-slate-300">
                <div class="flex items-center gap-2">
                    <span class="hidden md:inline text-slate-400 line-clamp-1">
                        Telescope array to validate atmospheres
                    </span>
                </div>
                <button class="shrink-0 px-2 py-1 rounded bg-white/10 hover:bg-white/15 text-[11px]">
                    Read
                </button>
            </div>
        </article>
        <div class="grid grid-cols-1 gap-7">
            <!-- Technology -->
            <section>
                <header class="mb-2 flex items-center gap-2">
                    <i class="fa-solid fa-microchip text-slate-300"></i>
                    <h3 class="text-slate-200 font-semibold tracking-wide">Technology</h3>
                </header>
                <ul class="list-dot space-y-3">
                    <li>
                        <a class="text-slate-100 font-medium hover:underline" href="#">Open-source summarizer runs under 2GB RAM on laptops</a>
                        <div class="mt-1 flex items-center gap-3 text-[12px] text-slate-400">
                            <span>1h ago</span><span>·</span><span>The Verge</span>
                        </div>
                    </li>
                    <li>
                        <a class="text-slate-100 font-medium hover:underline" href="#">Toronto startup halves order errors with POS add-on</a>
                        <div class="mt-1 flex items-center gap-3 text-[12px] text-slate-400">
                            <span>2h ago</span><span>·</span><span>BetaKit</span>
                        </div>
                    </li>
                    <li>
                        <a class="text-slate-100 font-medium hover:underline" href="#">Laptop makers pivot to NPUs as battery gains outpace CPUs</a>
                        <div class="mt-1 flex items-center gap-3 text-[12px] text-slate-400">
                            <span>3h ago</span><span>·</span><span>PCMag</span>
                        </div>
                    </li>
                </ul>
            </section>
            <!-- Sports -->
            <section>
                <header class="mb-2 flex items-center gap-2">
                    <i class="fa-solid fa-football text-slate-300"></i>
                    <h3 class="text-slate-200 font-semibold tracking-wide">Sports</h3>
                </header>
                <ul class="list-dot space-y-3">
                    <li>
                        <a class="text-slate-100 font-medium hover:underline" href="#">Eagles camp: rookies shine in red-zone; defense tweaks packages</a>
                        <div class="mt-1 flex items-center gap-3 text-[12px] text-slate-400">
                            <span>38m ago</span><span>·</span><span>ESPN</span>
                            <span class="ml-auto px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-[11px] uppercase">NFL</span>
                        </div>
                    </li>
                    <li>
                        <a class="text-slate-100 font-medium hover:underline" href="#">UFC Paris: Imavov vs Borralho — keys to victory</a>
                        <div class="mt-1 flex items-center gap-3 text-[12px] text-slate-400">
                            <span>2h ago</span><span>·</span><span>MMA Fighting</span>
                        </div>
                    </li>
                </ul>
            </section>
            <!-- Entertainment -->
            <section>
                <header class="mb-2 flex items-center gap-2">
                    <i class="fa-solid fa-clapperboard text-slate-300"></i>
                    <h3 class="text-slate-200 font-semibold tracking-wide">Entertainment</h3>
                </header>
                <ul class="list-dot space-y-3">
                    <li>
                        <a class="text-slate-100 font-medium hover:underline" href="#">Critics hail new sci-fi series as “the next genre classic”</a>
                        <div class="mt-1 flex items-center gap-3 text-[12px] text-slate-400">
                            <span>1h ago</span><span>·</span><span>Variety</span>
                        </div>
                    </li>
                    <li>
                        <a class="text-slate-100 font-medium hover:underline" href="#">Documentary charts the rise of indie game studios</a>
                        <div class="mt-1 flex items-center gap-3 text-[12px] text-slate-400">
                            <span>4h ago</span><span>·</span><span>Polygon</span>
                        </div>
                    </li>
                </ul>
            </section>
            <!-- Business -->
            <section>
                <header class="mb-2 flex items-center gap-2">
                    <i class="fa-solid fa-chart-line text-slate-300"></i>
                    <h3 class="text-slate-200 font-semibold tracking-wide">Business</h3>
                </header>
                <ul class="list-dot space-y-3">
                    <li>
                        <a class="text-slate-100 font-medium hover:underline" href="#">Markets rebound as inflation cools faster than expected</a>
                        <div class="mt-1 flex items-center gap-3 text-[12px] text-slate-400">
                            <span>3h ago</span><span>·</span><span>Bloomberg</span>
                        </div>
                    </li>
                    <li>
                        <a class="text-slate-100 font-medium hover:underline" href="#">Restaurant tech M&amp;A heats up ahead of holiday season</a>
                        <div class="mt-1 flex items-center gap-3 text-[12px] text-slate-400">
                            <span>6h ago</span><span>·</span><span>WSJ</span>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<style scoped></style>