<script setup>
</script>

<template>
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
</template>

<style scoped></style>