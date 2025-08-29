<script setup>
import ShortcutsSearch from '@/components/ShortcutsSearch.vue';
import WeatherWidget from '@/components/WeatherWidget.vue';
import TaskWidget from '@/components/TaskWidget.vue';
import WorkoutTracker from '@/components/WorkoutTracker.vue';
import SteamWishlist from '@/components/SteamWishlist.vue';
import UfcEvents from '@/components/UfcEvents.vue';
import EaglesGames from '@/components/EaglesGames.vue';
import TvSchedule from '@/components/TvSchedule.vue';
import NewsHeadlines from '@/components/NewsHeadlines.vue';
</script>

<template>
    <ShortcutsSearch />
    <section class="grid h-full min-h-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start [grid-auto-flow:row_dense]" id="widgets-grid">

        <!-- ===================== COLUMN 1 ===================== -->
        <section class="flex flex-col gap-6 h-full min-h-0" id="col-1">
            <WeatherWidget />
            <TaskWidget />
        </section>
        <!-- ===================== COLUMN 2 ===================== -->
        <section class="lg:col-start-2 lg:col-end-3 flex flex-col gap-4 w-full min-h-0 h-full">
            <WorkoutTracker />
            <SteamWishlist />
        </section>
        <!-- ===================== COLUMN 3 ===================== -->
        <section class="lg:col-start-3 lg:col-end-4 flex flex-col gap-4 w-full min-h-0 h-full">
            <UfcEvents />
            <EaglesGames />
            <TvSchedule />
        </section>
        <!-- ===================== COLUMN 4 ===================== -->
        <section class="glass rounded-md shadow-card flex flex-col w-full h-full min-h-0 overflow-hidden" id="widget-news">
            <NewsHeadlines />
        </section>
    </section>
</template>

<style scoped></style>