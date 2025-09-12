<script setup>
import { ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { Tabs, TabList, Tab } from 'primevue';
import AppHeader from './components/layouts/AppHeader.vue';
import AppFooter from './components/layouts/AppFooter.vue';
import AppSidebar from './components/layouts/AppSidebar.vue';

const route = useRoute();

const tabValue = ref('');
// 監聽路由變化，同步更新 tabValue
watch(
  () => route.name,
  (newVal) => {
    tabValue.value = newVal;
  }
);

const linkItems = ref([
  { routeNm: 'Design', label: '資料表設計', icon: 'fluent-mdl2:design' },
  { routeNm: 'SQLite', label: 'SQLite', icon: 'file-icons:sqlite' },
  // { routeNm: 'ExportSQL', label: 'ExportSQL', icon: '' },
]);
</script>

<template>
  <div class="mx-auto">
    <div class="flex flex-col">
      <AppHeader />
      <div class="grid grid-cols-9 gap-6 mx-10">
        <div class="col-span-2">
          <AppSidebar />
        </div>
        <div class="col-span-7">
          <Tabs v-model:value="tabValue" class="">
            <TabList>
              <Tab v-for="tab in linkItems" :key="tab.routeNm" :value="tab.routeNm" class="">
                <RouterLink :to="{ name: tab.routeNm }" v-slot="{ href, navigate }" custom>
                  <a :href="href" @click="navigate" class="flex items-center gap-2">
                    <Iconify :icon="tab.icon" width="20" height="20" />
                    <span>{{ tab.label }}</span>
                  </a>
                </RouterLink>
              </Tab>
            </TabList>
          </Tabs>
          <RouterView v-slot="{ Component }">
            <KeepAlive>
              <component :is="Component" class="bg-white h-[calc(100vh-181px)] p-4" />
            </KeepAlive>
          </RouterView>
        </div>
      </div>
      <AppFooter />
    </div>
  </div>
</template>

<style scoped></style>
