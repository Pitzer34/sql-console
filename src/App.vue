<script setup>
import { onMounted, ref } from 'vue';
import { useSqlStore } from './store/sqlStore.js';
import { RouterView } from 'vue-router';
import { Tabs, TabList, Tab, TabPanels } from 'primevue';
import AppHeader from './components/layouts/AppHeader.vue';
import AppFooter from './components/layouts/AppFooter.vue';
import SQLTableList from './components/ui/SQLTableList.vue';

const sqlStore = useSqlStore();
const linkItems = ref([
  { routeNm: 'Design', label: '資料表設計', icon: '' },
  // { routeNm: 'SQLite', label: 'SQLite', icon: '' },
  // { routeNm: 'ExportSQL', label: 'ExportSQL', icon: '' },
]);
</script>

<template>
  <div class="mx-auto h-full">
    <div class="flex flex-col h-full">
      <AppHeader />
      <div class="flex-1 grid grid-cols-9 gap-6 mx-10 h-full">
        <div class="col-span-2">
          <SQLTableList />
        </div>
        <div class="col-span-7">
          <Tabs value="Console" class="h-full">
            <TabList>
              <RouterLink v-for="tab in linkItems" :key="tab.routeNm" :to="{ name: tab.routeNm }">
                <Tab :value="tab.routeNm">
                  {{ tab.label }}
                </Tab>
              </RouterLink>
            </TabList>
            <TabPanels class="h-full">
              <RouterView v-slot="{ Component }">
                <KeepAlive>
                  <component :is="Component" />
                </KeepAlive>
              </RouterView>
            </TabPanels>
          </Tabs>
        </div>
      </div>
      <AppFooter />
    </div>
  </div>
</template>

<style scoped></style>
