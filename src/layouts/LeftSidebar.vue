<script setup>
import { useSqlStore } from '../store/sqlStore.js';
import { PanelMenu } from 'primevue';

const sqlStore = useSqlStore();
</script>

<template>
  <div class="flex flex-col border rounded p-2 bg-white h-full overflow-auto">
    <div class="text-xl px-2 py-1.5">{{ 'Table' }}</div>
    <PanelMenu :model="sqlStore.tableLists" multiple pt:panel:class="border-0 p-0">
      <template #item="{ item }">
        <div v-if="item.items" class="flex items-center">
          <Iconify icon="mingcute:right-fill" width="20" height="20" />
          <span>{{ item.label }}</span>
          <span class="flex-1 flex justify-end">
            <Iconify
              icon="material-symbols-light:delete-outline"
              width="24"
              height="24"
              class="rounded border-red-400 text-red-400 hover:border-2"
              @click="sqlStore.deleteTable(item.label)"
            />
          </span>
        </div>
        <div v-else class="flex items-center">
          <span>{{ item.label }}</span>
        </div>
      </template>
    </PanelMenu>
  </div>
</template>

<style scoped></style>
