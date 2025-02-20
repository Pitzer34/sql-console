<script setup>
import { ref } from 'vue';
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
      <h1 class="text-center text-3xl font-bold py-4">{{ title }}</h1>
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
              <RouterView />
            </TabPanels>
          </Tabs>
        </div>
      </div>
      <footer class="text-center py-4">
        {{ "© 2025 Pitzer34. All rights reserved. " }}
      </footer>
    </div>
  </main>
</template>

<style scoped></style>
