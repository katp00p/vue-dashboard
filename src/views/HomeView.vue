<script setup>
</script>

<template>
    <!-- ===== Shortcuts + ChatGPT Search ===== -->
    <section class="mb-4 shrink-0" id="shortcuts">
        <div class="glass rounded-md px-4 py-3 flex items-center gap-4 overflow-hidden">
            <div class="shortcuts-rail flex items-center gap-3 flex-nowrap overflow-x-auto pr-2">
                <!-- Group 1 — green -->
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://www.youtube.com" title="YouTube"><i class="fa-brands fa-youtube"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://github.com" title="GitHub"><i class="fa-brands fa-github"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://mail.google.com" title="Gmail"><i class="fa-regular fa-envelope"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://drive.google.com" title="Google Drive"><i class="fa-brands fa-google-drive"></i></a>
                <!-- Group 2 — pink -->
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://chat.openai.com" title="ChatGPT"><i class="fa-solid fa-robot"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://twitter.com" title="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://reddit.com" title="Reddit"><i class="fa-brands fa-reddit-alien"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://linkedin.com" title="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
                <!-- Group 3 — blue -->
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://store.steampowered.com" title="Steam"><i class="fa-brands fa-steam"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://spotify.com" title="Spotify"><i class="fa-brands fa-spotify"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://facebook.com" title="Facebook"><i class="fa-brands fa-facebook"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://instagram.com" title="Instagram"><i class="fa-brands fa-instagram"></i></a>
                <!-- Group 4 — amber -->
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://tiktok.com" title="TikTok"><i class="fa-brands fa-tiktok"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://whatsapp.com" title="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://discord.com" title="Discord"><i class="fa-brands fa-discord"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://amazon.com" title="Amazon"><i class="fa-brands fa-amazon"></i></a>
                <!-- Group 5 — violet -->
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://netflix.com" title="Netflix"><i class="fa-solid fa-n"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://openai.com" title="OpenAI"><i class="fa-solid fa-brain"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://pinterest.com" title="Pinterest"><i class="fa-brands fa-pinterest"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://apple.com" title="Apple"><i class="fa-brands fa-apple"></i></a>
                <!-- Group 6 — teal -->
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://microsoft.com" title="Microsoft"><i class="fa-brands fa-microsoft"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://slack.com" title="Slack"><i class="fa-brands fa-slack"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://asana.com" title="Asana"><i class="fa-solid fa-diagram-project"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://figma.com" title="Figma"><i class="fa-brands fa-figma"></i></a>
                <!-- Group 7 — rose -->
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://dribbble.com" title="Dribbble"><i class="fa-brands fa-dribbble"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://behance.net" title="Behance"><i class="fa-brands fa-behance"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://trello.com" title="Trello"><i class="fa-brands fa-trello"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://notion.so" title="Notion"><i class="fa-regular fa-file-lines"></i></a>
                <!-- Group 8 — cyan -->
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://medium.com" title="Medium"><i class="fa-brands fa-medium"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://news.ycombinator.com" title="Hacker News"><i class="fa-solid fa-newspaper"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://bbc.com" title="BBC"><i class="fa-solid fa-globe"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://cnn.com" title="CNN"><i class="fa-solid fa-tv"></i></a>
                <!-- Group 9 — lime -->
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://nytimes.com" title="NY Times"><i class="fa-regular fa-newspaper"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://washingtonpost.com" title="Washington Post"><i class="fa-solid fa-scroll"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://bloomberg.com" title="Bloomberg"><i class="fa-solid fa-chart-line"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://coinmarketcap.com" title="Crypto"><i class="fa-solid fa-coins"></i></a>
                <!-- Group 10 — indigo -->
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://weather.com" title="Weather"><i class="fa-solid fa-cloud-sun"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://calendar.google.com" title="Calendar"><i class="fa-regular fa-calendar"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://maps.google.com" title="Maps"><i class="fa-solid fa-map"></i></a>
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="https://photos.google.com" title="Photos"><i class="fa-regular fa-image"></i></a>
                <!-- Final single (pure white gear) -->
                <a class="shortcut text-white text-4xl drop-shadow-lg hover:scale-110 transition" href="#" title="Settings">
                    <i class="fa-solid fa-gear"></i>
                </a>
            </div>
            <!-- Spacer -->
            <div class="flex-1"></div>
            <!-- Right: ChatGPT Search -->
            <form class="hidden md:flex items-center gap-2">
                <div class="relative">
                    <i class="fa-solid fa-robot absolute left-3 top-1/2 -translate-y-1/2 opacity-70"></i>
                    <input class="pl-10 pr-3 py-2 bg-white/5 rounded-md outline-none focus:ring-2 focus:ring-[var(--ring)] text-slate-100 placeholder:[color:var(--hint)] w-[400px]" placeholder="Ask ChatGPT…" type="search" />
                </div>
                <button class="rounded-md bg-accent/90 hover:bg-accent px-3 py-2 text-sm font-medium" type="submit">
                    Go
                </button>
            </form>
        </div>
    </section>
    <section class="grid h-full min-h-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start [grid-auto-flow:row_dense]" id="widgets-grid">
        <!-- ===================== COLUMN 1 ===================== -->
        <section class="flex flex-col gap-6 h-full min-h-0" id="col-1">
            <!-- WEATHER -->
            <section class="glass rounded-md shadow-card p-5 w-full overflow-hidden" id="widget-weather">
                <!-- ...unchanged content... -->
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h2 class="card-title text-slate-100 font-semibold tracking-wide">Toronto Weather</h2>
                        <p class="text-slate-300 text-sm">Partly Cloudy</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <i class="fa-solid fa-cloud-sun text-4xl text-white"></i>
                        <div class="text-right">
                            <p class="text-3xl font-bold text-white leading-tight">22°C</p>
                            <p class="text-slate-300 text-sm leading-tight">H: 25° / L: 17°</p>
                        </div>
                    </div>
                </div>
                <!-- 7-Day Forecast -->
                <div class="grid grid-cols-7 gap-3 text-center text-slate-300 text-sm mt-3">
                    <div class="rounded-lg py-3 border border-accent/30 bg-accent/15">
                        <p class="font-medium">Mon</p>
                        <i class="fa-solid fa-cloud-sun text-lg text-white"></i>
                        <p class="text-sm">24° / 16°</p>
                    </div>
                    <div class="rounded-lg py-3 border border-accent/30 bg-accent/15">
                        <p class="font-medium">Tue</p>
                        <i class="fa-solid fa-cloud-showers-heavy text-lg text-white"></i>
                        <p class="text-sm">20° / 14°</p>
                    </div>
                    <div class="rounded-lg py-3 border border-accent/30 bg-accent/15">
                        <p class="font-medium">Wed</p>
                        <i class="fa-solid fa-cloud text-lg text-white"></i>
                        <p class="text-sm">19° / 13°</p>
                    </div>
                    <div class="rounded-lg py-3 border border-accent/30 bg-accent/15">
                        <p class="font-medium">Thu</p>
                        <i class="fa-solid fa-sun text-lg text-white"></i>
                        <p class="text-sm">26° / 18°</p>
                    </div>
                    <div class="rounded-lg py-3 border border-accent/30 bg-accent/15">
                        <p class="font-medium">Fri</p>
                        <i class="fa-solid fa-cloud-sun-rain text-lg text-white"></i>
                        <p class="text-sm">23° / 17°</p>
                    </div>
                    <div class="rounded-lg py-3 border border-accent/30 bg-accent/15">
                        <p class="font-medium">Sat</p>
                        <i class="fa-solid fa-bolt text-lg text-white"></i>
                        <p class="text-sm">21° / 15°</p>
                    </div>
                    <div class="rounded-lg py-3 border border-accent/30 bg-accent/15">
                        <p class="font-medium">Sun</p>
                        <i class="fa-solid fa-cloud-sun text-lg text-white"></i>
                        <p class="text-sm">24° / 16°</p>
                    </div>
                </div>
            </section>
            <!-- TO-DO (fills remainder; internal scroll) -->
            <section class="glass rounded-md shadow-card flex flex-col flex-1 min-h-0 w-full overflow-hidden" id="widget-todo">
                <!-- Header / input -->
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
        </section>
        <!-- ===================== COLUMN 2 (WORKOUT TRACKER — COMPACT, MIXED, BLUE RIDES) ===================== -->
        <!-- COLUMN 2 STACK (fills full column height) -->
        <div class="lg:col-start-2 lg:col-end-3 flex flex-col gap-4 w-full min-h-0 h-full">
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
        </div>
        <div class="lg:col-start-3 lg:col-end-4 flex flex-col gap-4 w-full min-h-0 h-full">
            <!-- ===================== COLUMN 3 (UFC TRACKER) ===================== -->
            <section class="glass rounded-md shadow-card shrink-0 flex flex-col overflow-hidden" id="widget-ufc">
                <!-- Header (matches Eagles/TV/News) -->
                <div class="sticky top-0 z-20 border-b border-white/10 bg-transparent px-4 py-2">
                    <div class="flex items-start justify-between gap-3">
                        <div class="flex flex-col">
                            <h2 class="card-title text-slate-100 font-semibold leading-tight">UFC Tracker</h2>
                            <div class="mt-1 flex items-center gap-2 text-xs text-slate-400">
                                <i class="fa-solid fa-rotate-right"></i><span>Updated 13 seconds ago</span>
                            </div>
                        </div>
                        <button aria-label="UFC settings" class="shrink-0 p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40" type="button">
                            <i class="fa-solid fa-gear text-base"></i>
                        </button>
                    </div>
                </div>
                <!-- Buttons + Centered content (same pattern as Eagles) -->
                <div class="mt-2 px-4 pt-3 pb-5 grid grid-cols-[1.5rem,1fr,1.5rem] md:grid-cols-[1.75rem,1fr,1.75rem] items-stretch gap-2">
                    <!-- Left button (disabled on first event) -->
                    <div class="flex">
                        <button aria-disabled="true" class="h-full w-4 md:w-5 rounded-sm border border-white/10 bg-white/10 text-slate-200/90 flex items-center justify-center hover:bg-white/20 transition disabled:opacity-30 disabled:cursor-not-allowed" disabled="" title="Previous event">
                            <i class="fa-solid fa-play rotate-180 text-[9px] md:text-[10px]"></i>
                        </button>
                    </div>
                    <!-- Center content -->
                    <div class="px-4 pt-3 pb-5 text-center">
                        <!-- Event label -->
                        <div class="mt-1 text-slate-300 text-sm md:text-base">UFC Fight Night</div>
                        <!-- Matchup -->
                        <div class="text-white text-2xl md:text-3xl font-semibold tracking-[0.03em]">
                            <div class="flex items-center justify-center gap-3 md:gap-4">
                                <span>Imavov</span>
                                <span class="align-baseline text-sm md:text-base font-normal opacity-80 mx-1.5 tracking-normal">vs</span>
                                <span>Borralho</span>
                            </div>
                        </div>
                        <!-- Venue -->
                        <div class="mt-1 text-slate-300 text-sm md:text-base">
                            Accor Arena — Paris, France
                        </div>
                        <!-- Date -->
                        <div class="mt-2 mb-5 text-slate-300 italic text-[11px] md:text-xs">
                            Sat, Sep 6, 2025
                        </div>
                        <!-- Countdown (no glass) -->
                        <div class="text-xl md:text-2xl font-semibold text-white" data-event-date="2025-09-06T16:00:00-04:00" id="ufc-countdown">
                            9d 12h 00m
                        </div>
                    </div>
                    <!-- Right button -->
                    <div class="flex justify-end">
                        <button class="h-full w-4 md:w-5 rounded-sm border border-white/10 bg-white/10 text-slate-200/90 flex items-center justify-center hover:bg-white/20 transition" title="Next event">
                            <i class="fa-solid fa-play text-[9px] md:text-[10px]"></i>
                        </button>
                    </div>
                </div>
            </section>
            <!-- ===================== COLUMN 3 (EAGLES TRACKER) ===================== -->
            <section class="glass rounded-md shadow-card shrink-0 flex flex-col overflow-hidden" id="widget-eagles">
                <div class="sticky top-0 z-20 border-b border-white/10 bg-transparent px-4 py-2">
                    <div class="flex items-start justify-between gap-3">
                        <div class="flex flex-col">
                            <h2 class="card-title text-slate-100 font-semibold leading-tight">Philadelphia Eagles</h2>
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
            <!-- ===================== COLUMN 3 (TV TRACKER — COMPACT, SCROLLS) ===================== -->
            <section class="glass rounded-md shadow-card flex flex-col overflow-hidden flex-1 min-h-[320px]" id="widget-tv">
                <!-- Header -->
                <div class="sticky top-0 z-20 border-b border-white/10 bg-transparent px-4 py-2">
                    <div class="flex items-start justify-between gap-3">
                        <div class="flex flex-col">
                            <h2 class="card-title text-slate-100 font-semibold leading-tight">Upcoming Television</h2>
                            <div class="mt-1 flex items-center gap-2 text-xs text-slate-400">
                                <i class="fa-solid fa-rotate-right"></i><span>Updated just now</span>
                            </div>
                        </div>
                        <button aria-label="TV settings" class="shrink-0 p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40" type="button">
                            <i class="fa-solid fa-gear text-base"></i>
                        </button>
                    </div>
                </div>
                <!-- Scroll area -->
                <div class="scrollbar scrollbar--neutral scrollbar--thin flex-1 min-h-0 overflow-y-auto p-3">
                    <!-- Grid: Date | Time | Show | Channel -->
                    <div class="grid grid-cols-[8.5rem,4.5rem,1fr,9rem] gap-x-3 gap-y-1 text-[13px] text-slate-300 leading-snug">
                        <!-- Wed, Aug 27 -->
                        <div class="text-slate-400">Wed, Aug 27</div>
                        <div class="text-right text-sm md:text-[15px] font-medium text-slate-400">7:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">UFC Countdown: Imavov vs Borralho</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">ESPN / YouTube</div>
                        <div></div>
                        <div class="text-right text-sm md:text-[15px] font-medium text-slate-400">9:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">Alien Earth — S01E03 (replay)</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">FX</div>
                        <!-- Day spacer -->
                        <div class="col-span-4 h-4 md:h-5"></div>
                        <!-- Thu, Aug 28 -->
                        <div class="text-slate-200">Thu, Aug 28</div>
                        <div class="text-right text-sm md:text-[15px] font-medium">8:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">NFL Total Access</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">NFLN</div>
                        <div></div>
                        <div class="text-right text-sm md:text-[15px] font-medium">10:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">UFC Unfiltered (video)</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">YouTube</div>
                        <div class="col-span-4 h-4 md:h-5"></div>
                        <!-- Fri, Aug 29 -->
                        <div class="text-slate-200">Fri, Aug 29</div>
                        <div class="text-right text-sm md:text-[15px] font-medium">7:30p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">Alien Earth — Rewatch</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">Hulu</div>
                        <div></div>
                        <div class="text-right text-sm md:text-[15px] font-medium">9:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">UFC Embedded: Fight Night (Ep. 1)</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">YouTube</div>
                        <div></div>
                        <div class="text-right text-sm md:text-[15px] font-medium">11:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">Top Plays — Week Preview</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">ESPN2</div>
                        <div class="col-span-4 h-4 md:h-5"></div>
                        <!-- Sat, Aug 30 -->
                        <div class="text-slate-200">Sat, Aug 30</div>
                        <div class="text-right text-sm md:text-[15px] font-medium">6:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">College Football PrimeTime</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">ESPN</div>
                        <div></div>
                        <div class="text-right text-sm md:text-[15px] font-medium">8:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">UFC Prelims — Imavov/Borralho</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">ESPN+</div>
                        <div></div>
                        <div class="text-right text-sm md:text-[15px] font-medium">10:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">UFC Post Show</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">ESPN+</div>
                        <div class="col-span-4 h-4 md:h-5"></div>
                        <!-- Sun, Aug 31 -->
                        <div class="text-slate-200">Sun, Aug 31</div>
                        <div class="text-right text-sm md:text-[15px] font-medium">7:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">NFL GameDay</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">NFLN</div>
                        <div></div>
                        <div class="text-right text-sm md:text-[15px] font-medium">8:20p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">Sunday Night Football — Preview</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">NBC</div>
                        <div></div>
                        <div class="text-right text-sm md:text-[15px] font-medium">11:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">Mic’d Up — Camp Edition</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">NFLN</div>
                        <div class="col-span-4 h-4 md:h-5"></div>
                        <!-- Mon, Sep 1 -->
                        <div class="text-slate-200">Mon, Sep 1</div>
                        <div class="text-right text-sm md:text-[15px] font-medium">7:30p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">Hard Knocks (rewatch)</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">Max</div>
                        <div></div>
                        <div class="text-right text-sm md:text-[15px] font-medium">8:15p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">MNF — Preseason Special</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">ESPN</div>
                        <div></div>
                        <div class="text-right text-sm md:text-[15px] font-medium">10:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">NFL Films Presents</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">FS1</div>
                        <div class="col-span-4 h-4 md:h-5"></div>
                        <!-- Tue, Sep 2 -->
                        <div class="text-slate-200">Tue, Sep 2</div>
                        <div class="text-right text-sm md:text-[15px] font-medium">6:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">Around the NFL</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">NFLN</div>
                        <div></div>
                        <div class="text-right text-sm md:text-[15px] font-medium">8:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">UFC Tonight — Preview</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">ESPN2</div>
                        <div></div>
                        <div class="text-right text-sm md:text-[15px] font-medium">10:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">Alien Earth — S01E04 (new)</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">FX / Hulu</div>
                        <div class="col-span-4 h-4 md:h-5"></div>
                        <!-- Wed, Sep 3 -->
                        <div class="text-slate-200">Wed, Sep 3</div>
                        <div class="text-right text-sm md:text-[15px] font-medium">7:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">UFC Embedded (Ep. 2)</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">YouTube</div>
                        <div></div>
                        <div class="text-right text-sm md:text-[15px] font-medium">9:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">Total Access — Roster Cuts</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">NFLN</div>
                        <div class="col-span-4 h-4 md:h-5"></div>
                        <!-- Thu, Sep 4 -->
                        <div class="text-slate-200">Thu, Sep 4</div>
                        <div class="text-right text-sm md:text-[15px] font-medium">7:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">TNF Kickoff Show</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">Prime Video</div>
                        <div></div>
                        <div class="text-right text-sm md:text-[15px] font-medium">9:30p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">Alien Earth — Deep Dive</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">YouTube</div>
                        <div class="col-span-4 h-4 md:h-5"></div>
                        <!-- Fri, Sep 5 -->
                        <div class="text-slate-200">Fri, Sep 5</div>
                        <div class="text-right text-sm md:text-[15px] font-medium">6:30p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">UFC Weigh-ins: Imavov vs Borralho</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">ESPN+</div>
                        <div></div>
                        <div class="text-right text-sm md:text-[15px] font-medium">9:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">UFC Embedded (Ep. 3)</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">YouTube</div>
                        <div class="col-span-4 h-4 md:h-5"></div>
                        <!-- Sat, Sep 6 -->
                        <div class="text-slate-200">Sat, Sep 6</div>
                        <div class="text-right text-sm md:text-[15px] font-medium">4:30p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">UFC Early Prelims</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">ESPN+</div>
                        <div></div>
                        <div class="text-right text-sm md:text-[15px] font-medium">7:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">UFC Fight Night — Imavov vs Borralho</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">ESPN+</div>
                        <div></div>
                        <div class="text-right text-sm md:text-[15px] font-medium">10:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">UFC Post-Fight Show</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">ESPN+</div>
                        <div class="col-span-4 h-4 md:h-5"></div>
                        <!-- Sun, Sep 7 -->
                        <div class="text-slate-200">Sun, Sep 7</div>
                        <div class="text-right text-sm md:text-[15px] font-medium">7:00p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">NFL RedZone (recap)</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">NFLN</div>
                        <div></div>
                        <div class="text-right text-sm md:text-[15px] font-medium">8:20p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">Sunday Night Football</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">NBC / Peacock</div>
                        <div class="col-span-4 h-4 md:h-5"></div>
                        <!-- Mon, Sep 8 -->
                        <div class="text-slate-200">Mon, Sep 8</div>
                        <div class="text-right text-sm md:text-[15px] font-medium">7:30p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">MNF Countdown</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">ESPN</div>
                        <div></div>
                        <div class="text-right text-sm md:text-[15px] font-medium">8:15p</div>
                        <div class="truncate text-slate-100 text-sm md:text-[15px] font-medium">Monday Night Football</div>
                        <div class="truncate text-slate-400 text-right text-[12px] md:text-[13px]">ESPN / ABC</div>
                    </div>
                </div>
            </section>
        </div>
        <section class="glass rounded-md shadow-card flex flex-col w-full h-full min-h-0 overflow-hidden" id="widget-news">
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
        </section>
    </section>
</template>

<style scoped></style>