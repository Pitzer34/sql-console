<script setup>
import { ref, KeepAlive } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
import { Tabs, TabList, Tab, TabPanels } from 'primevue';
import LeftSidebar from './LeftSidebar.vue';

const title = ref('SQL-Console');

const linkItems = ref([
  { routeNm: 'FieldList', label: 'FieldList', icon: '' },
  { routeNm: 'SQLite', label: 'SQLite', icon: '' },
  { routeNm: 'ExportSQL', label: 'ExportSQL', icon: '' },
]);
</script>

<template>
  <main class="mx-auto max-w-7xl h-full">
    <div class="flex flex-col h-full">
      <div class="flex justify-center items-center gap-4 py-4">
        <h1 class="text-3xl font-bold">{{ title }}</h1>
        <a href="https://github.com/Pitzer34/sql-console" target="_blank" rel="noopener">
          <Iconify icon="mdi:github" width="2rem" heigth="2rem" />
        </a>
      </div>
      <div class="flex-1 grid grid-cols-5 gap-2 mx-10">
        <div class="col-span-1">
          <LeftSidebar />
        </div>
        <div class="col-span-4">
          <Tabs value="Console" class="h-full">
            <TabList>
              <RouterLink v-for="tab in linkItems" :key="tab.routeNm" :to="{ name: tab.routeNm }">
                <Tab :value="tab.routeNm">
                  {{ tab.label }}
                </Tab>
              </RouterLink>
            </TabList>
            <TabPanels class="p-1 h-full">
              <RouterView v-slot="{ Component }">
                <KeepAlive>
                  <component :is="Component" />
                </KeepAlive>
              </RouterView>
            </TabPanels>
          </Tabs>
        </div>
      </div>
      <footer class="text-center py-4">
        {{ '© 2025 Pitzer34. All rights reserved. ' }}
      </footer>
    </div>
  </main>
</template>

<style scoped></style>
