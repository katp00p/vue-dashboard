<script setup>
import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <NavBar />
  <main class="mx-auto max-w-[95%] px-2 pt-6 pb-4 h-[calc(100vh-3.5rem)] flex flex-col" id="main">
    <RouterView />
  </main>
</template>

<style scoped></style>