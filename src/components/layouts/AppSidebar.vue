<script setup>
import { computed } from 'vue';
import { useSqlStore } from '../../store/sqlStore.js';
import { storeToRefs } from 'pinia';
import { useSqlite } from '../../composables/sqlite.js';
import { PanelMenu } from 'primevue';

//* Pinia Store
const sqlStore = useSqlStore();
const { tables } = storeToRefs(sqlStore);
//* Composable
const sqlite = useSqlite();

const tableList = computed(() =>
  tables.value
    // 過濾掉SQLite因為AUTOINCREMENT自動生成的資料表sqlite_sequence
    .filter((table) => table.name !== 'sqlite_sequence')
    .map((table) => ({
      label: table.name,
      items: table.columns.map((field) => ({ label: field.name })),
    }))
);
</script>

<template>
  <div class="flex flex-col rounded p-1 bg-white h-full overflow-auto">
    <div class="text-md font-bold text-slate-500 px-2 py-1.5">{{ '資料表' }}</div>
    <PanelMenu
      :model="tableList"
      multiple
      :pt="{
        root: { class: '!gap-0' },
        panel: { class: '!border-0' },
      }"
    >
      <template #item="{ item }">
        <div v-if="item.items" class="flex items-center cursor-pointer">
          <Iconify icon="mdi-light:table" class="mr-1 h-6 w-6 shrink-0" />
          <span class="truncate">{{ item.label }}</span>

          <Iconify
            icon="material-symbols-light:delete-outline"
            width="24"
            height="24"
            class="shrink-0 ml-auto rounded border-red-400 text-red-400 hover:border-2"
            @click="sqlite.deleteTable(item.label)"
          />
        </div>
        <div v-else class="flex items-center">
          <Iconify icon="ri:input-field" class="mr-1 h-6 w-6 shrink-0" />
          <span class="truncate">{{ item.label }}</span>
        </div>
      </template>
    </PanelMenu>
  </div>
</template>

<style scoped></style>
