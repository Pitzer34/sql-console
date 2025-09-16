<script setup>
import { ref } from 'vue';
import { Textarea, Button, useToast, Card, Message } from 'primevue';
import LogTable from '../components/ui/LogTable.vue';
import { useSqlStore } from '../store/sqlStore';
import { useSqlite } from '../composables/sqlite';

//* primevue
const toast = useToast();
//* Pinia Store
const { sqliteDB, toastTime } = useSqlStore();
//* Composable
const sqlite = useSqlite();

const text = ref('');
const selectResult = ref([]);
const executionInfo = ref(null);

const execute = () => {
  const setExecutionInfo = (type, message) => {
    executionInfo.value = {
      type,
      message,
      timestamp: new Date().toLocaleString(),
    };
  };

  try {
    const sqlText = text.value.trim();
    if (!sqlText) {
      setExecutionInfo('warning', '請輸入 SQL 指令');
      return;
    }

    executionInfo.value = null;
    selectResult.value = [];

    // 執行 SQL
    const execResult = sqliteDB.exec(sqlText);

    if (execResult.length === 0) {
      setExecutionInfo('success', '執行完成');
    } else {
      selectResult.value = execResult;
    }
  } catch (error) {
    setExecutionInfo('error', `執行失敗: ${error.message || error}`);
  } finally {
    sqlite.refreshTableSidebar();
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
      life: toastTime,
    });
  }
};
</script>

<template>
  <main class="flex flex-col gap-2">
    <div class="flex-1">
      <Textarea id="sqlText" v-model="text" class="w-full h-full" style="resize: none" />
    </div>
    <Card pt:body:class="!p-3">
      <template #content>
        <div class="flex gap-4">
          <Button v-tooltip.top="'執行'" @click="execute" size="small" severity="danger" outlined>
            <Iconify icon="mingcute:play-fill" width="24" height="24" />
          </Button>
          <Button v-tooltip.top="'範例sql指令'" @click="getExampleSqlStr" size="small" severity="info" outlined>
            <Iconify icon="ant-design:code-outlined" width="24" height="24" />
          </Button>
        </div>
      </template>
    </Card>
    <Card class="flex-1 overflow-auto" pt:body:class="!p-3">
      <template #content>
        <!-- 執行信息顯示 -->
        <Message class="mb-4" v-if="executionInfo" :severity="executionInfo.type">
          <p>{{ executionInfo.message }}</p>
          <p class="text-sm mt-1">執行時間: {{ executionInfo.timestamp }}</p>
        </Message>
        <!-- 查詢結果顯示 -->
        <div v-if="selectResult" class="flex flex-col gap-4">
          <div v-for="(table, index) in selectResult" :key="index">
            <LogTable :data="table" class="" />
          </div>
        </div>
      </template>
    </Card>
  </main>
</template>

<style scoped></style>
