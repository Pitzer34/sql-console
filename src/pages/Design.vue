<script setup>
import { ref, watch } from 'vue';
import { useSqlStore } from '../store/sqlStore.js';
import { DATATYPES, COLUMNS } from '../services/constants/dataType.js';
import { FloatLabel, InputText, Checkbox, Select, Button, useToast, Toast } from 'primevue';

//* primevue
const toast = useToast();

const sqlStore = useSqlStore();

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

const createTableName = ref('');
const createTable = async () => {
  const selectedColumns = columns.value.filter((col) => col.selected);
  const { isSuccess, message } = sqlStore.createTable(createTableName.value, selectedColumns);

  toast.add({
    severity: isSuccess ? 'success' : 'error',
    summary: message,
    life: 3000,
  });
};
</script>

<template>
  <div class="">
    <Toast />
    <div class="p-3 border border-gray-200 shadow-sm mb-4">
      <!-- 顯示共享狀態 -->
      <!-- <div class="mb-4 p-3 bg-gray-50 rounded">
        <div class="flex justify-between items-center text-sm">
          <span>資料表數量: {{ database.tableCount }}</span>
          <span v-if="database.isLoading">🔄 載入中...</span>
          <Button @click="database.refresh" size="small" outlined>重新整理</Button>
        </div>
        <div v-if="database.errorMsg" class="text-red-600 mt-2">{{ database.errorMsg }}</div>
      </div> -->
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
    </div>
    <div class="overflow-auto shadow-sm" style="max-height: calc(100vh - 287px)">
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
  </div>
</template>

<style scoped></style>
