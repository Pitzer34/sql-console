<script setup>
import { ref } from 'vue';
import { useSqlStore } from '../store/sqlStore.js';
import { useSqlite } from '../composables/sqlite.js';
import { DATATYPES, COLUMNS } from '../services/constants/dataType.js';
import { FloatLabel, InputText, Checkbox, Select, Button, useToast, Toast, Card } from 'primevue';

//* Pinia Store
const sqlStore = useSqlStore();
//* primevue
const toast = useToast();
//* 欄位資料
const columns = ref([new COLUMNS(1)]);

const selectAll = ref(false);
const toggleSelectAll = () => {
  columns.value.forEach((col) => (col.selected = selectAll.value));
};

const addColumn = () => {
  const newId = Math.max(...columns.value.map((col) => col.id)) + 1;
  columns.value.push(new COLUMNS(newId));
};

const deleteSelectedColumns = () => {
  columns.value = columns.value.filter((col) => !col.selected);
  selectAll.value = false;
};

const onDataTypeChange = (column) => {
  const selectedType = DATATYPES.find((type) => type.value === column.dataType);
  if (selectedType && selectedType.hasLength) {
    column.length = selectedType.defaultLength;
  } else {
    column.length = '';
  }
};

//* sqlite composable
const sqlite = useSqlite();

const createTableName = ref('');
const createTable = async () => {
  const selectedColumns = columns.value.filter((col) => col.selected);
  const { isSuccess, message } = sqlite.createTable(createTableName.value, selectedColumns);

  toast.add({
    severity: isSuccess ? 'success' : 'error',
    summary: message,
    life: sqlStore.toastTime,
  });
};
</script>

<template>
  <main>
    <Toast />
    <Card class="mb-4" pt:body:class="!p-3">
      <template #content>
        <div class="flex justify-between items-center-safe">
          <div class="flex gap-4">
            <Button @click="addColumn()" size="small" outlined>新增欄位</Button>
            <Button @click="deleteSelectedColumns()" size="small" severity="danger" outlined>刪除欄位</Button>
          </div>
          <div class="flex gap-4">
            <FloatLabel variant="on">
              <InputText id="createTableName" v-model="createTableName" size="small" class="w-48" />
              <label for="createTableName">資料表名稱</label>
            </FloatLabel>
            <Button @click="createTable()" size="small">建立資料表</Button>
          </div>
        </div>
      </template>
    </Card>
    <div class="overflow-auto shadow-sm" style="max-height: calc(100vh - 290px)">
      <table class="w-full border-collapse">
        <thead class="sticky top-0 z-10">
          <tr class="bg-gray-100">
            <th class="border border-gray-300 p-2 w-12">
              <Checkbox v-model="selectAll" @change="toggleSelectAll" :binary="true" />
            </th>
            <th class="border border-gray-300 p-2 text-left font-semibold">資料行名稱</th>
            <th class="border border-gray-300 p-2 text-left font-semibold w-32">資料類型</th>
            <th class="border border-gray-300 p-2 text-left font-semibold w-20">長度</th>
            <th class="border border-gray-300 p-2 text-center font-semibold w-24">允許Null</th>
            <th class="border border-gray-300 p-2 text-center font-semibold w-24">主索引鍵</th>
            <th class="border border-gray-300 p-2 text-center font-semibold w-20">識別</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(column, index) in columns"
            :key="column.id"
            :class="{ 'bg-blue-50': column.selected, 'hover:bg-gray-50': !column.selected }"
            class="transition-colors"
          >
            <td class="border border-gray-300 p-1 text-center">
              <Checkbox v-model="column.selected" :binary="true" />
            </td>
            <td class="border border-gray-300 p-1">
              <InputText
                v-model="column.columnName"
                size="small"
                class="w-full border-0 bg-transparent p-1"
                :class="{ 'font-bold text-blue-700': column.isPrimaryKey }"
                placeholder="輸入欄位名稱"
              />
            </td>
            <td class="border border-gray-300 p-1">
              <Select
                v-model="column.dataType"
                :options="DATATYPES"
                optionLabel="label"
                optionValue="value"
                size="small"
                class="w-full"
                @change="onDataTypeChange(column)"
              />
            </td>
            <td class="border border-gray-300 p-1">
              <InputText
                v-model="column.length"
                size="small"
                class="w-full border-0 bg-transparent p-1"
                :disabled="!DATATYPES.find((type) => type.value === column.dataType)?.hasLength"
              />
            </td>
            <td class="border border-gray-300 p-1 text-center">
              <Checkbox v-model="column.allowNull" :binary="true" />
            </td>
            <td class="border border-gray-300 p-1 text-center">
              <Checkbox v-model="column.isPrimaryKey" :binary="true" />
            </td>
            <td class="border border-gray-300 p-1 text-center">
              <Checkbox v-model="column.isIdentity" :binary="true" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style scoped></style>
