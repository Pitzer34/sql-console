<script setup>
import { ref, computed } from 'vue';
import { usePublicStore } from '../store/publicStore.js';
import { storeToRefs } from 'pinia';
import db from '../composables/sql.js';
import PanelMenu from 'primevue/panelmenu';


const publicStore = usePublicStore();
const { sqlTableLists } = storeToRefs(publicStore);

const listItems = computed(() => {
  if (!sqlTableLists.value) return;
  return sqlTableLists.value.map((table) => {
    const fieldCode = db.exec(`PRAGMA table_info(${table});`)[0].values.map((field) => {
      return { label: field[1] }
    });
    console.log(fieldCode)
    return {
      label: table,
      items: fieldCode,
    }
  });
});
</script>

<template>
  <div class="flex flex-col border rounded p-2 bg-white h-full overflow-auto">
    <div class="text-xl px-2 py-1.5">{{ "Table List" }}</div>
    <PanelMenu :model="listItems" multiple pt:panel:class="border-none" />
  </div>
</template>

<style scoped></style>