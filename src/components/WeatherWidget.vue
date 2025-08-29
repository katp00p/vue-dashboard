<script setup>
</script>

<template>
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
</template>

<style scoped></style>