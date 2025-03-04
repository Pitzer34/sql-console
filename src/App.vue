<script setup>
import { onMounted } from 'vue';
import { useSqlStore } from './store/sqlStore.js';
import { RouterView } from 'vue-router';

const sqlStore = useSqlStore();

onMounted(() => {
  sqlStore.setExampleTable();
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
