<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';

const title = ref('SQL-Library');


</script>

<template>
  <main class="mx-auto max-w-7xl h-fvh">
    <h1 class="text-center text-3xl font-bold my-4">{{ title }}</h1>
    <RouterView />
  </main>
</template>

<style scoped></style>
