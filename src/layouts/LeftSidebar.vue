<script setup>
import { useSqlStore } from '../store/sqlStore.js';

import PanelMenu from 'primevue/panelmenu';

const sqlStore = useSqlStore();

</script>

<template>
  <div class="flex flex-col border rounded p-2 bg-white h-full overflow-auto">
    <div class="text-xl px-2 py-1.5">{{ "Table List" }}</div>
    <PanelMenu :model="sqlStore.tableLists" multiple pt:panel:class="" />
  </div>
</template>

<style scoped></style>