<script setup>
import { ref } from 'vue';
import { Textarea, Button, useToast } from 'primevue';
import AppCard from '../components/ui/AppCard.vue';
import LogTable from '../components/ui/LogTable.vue';
import { useSqlStore } from '../store/sqlStore';
import { useSqlite } from '../composables/sqlite';

//* Pinia Store
const sqlStore = useSqlStore();
//* Composable
const sqlite = useSqlite();
//* primevue
const toast = useToast();

const text = ref('');
const result = ref([]);

const execute = () => {
  try {
    result.value = sqlStore.sqliteDB.exec(text.value);
    sqlite.refreshTableSidebar();
    if (result.value.length === 0) {
      result.value = '執行完成';
    }
  } catch (error) {
    result.value = error;
  }
};

const getExampleSqlStr = () => {
  const { isSuccess, message } = sqlite.getSampleSqliteDataExcuteStr();
  if (isSuccess) {
    text.value = message;
  } else {
    toast.add({
      severity: 'error',
      summary: message,
      life: sqlStore.toastTime,
    });
  }
};
</script>

<template>
  <main class="flex flex-col gap-2">
    <div class="flex-1">
      <Textarea id="sqlText" v-model="text" class="w-full h-full" style="resize: none" />
    </div>
    <AppCard class="flex gap-4">
      <Button @click="execute" size="small" severity="danger" outlined>
        <Iconify icon="mingcute:play-fill" width="24" height="24" />
      </Button>
      <Button @click="getExampleSqlStr" size="small" severity="info" outlined>
        <Iconify icon="ant-design:code-outlined" width="24" height="24" />
      </Button>
    </AppCard>
    <AppCard class="flex-1 overflow-auto">
      <div v-if="Array.isArray(result)" class="flex flex-col gap-4">
        <div v-for="(table, index) in result" :key="index">
          <LogTable :data="table" class="" />
        </div>
      </div>
      <div v-else class="p-2">
        <span class="text-wrap">{{ result }}</span>
      </div>
    </AppCard>
  </main>
</template>

<style scoped></style>
