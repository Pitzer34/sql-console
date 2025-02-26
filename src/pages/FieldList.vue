<script setup>
import { ref } from 'vue';
import { useSqlStore } from '../store/sqlStore.js';
import FieldDialog from '../components/FieldDialog.vue';
import { DataTable, Column, FloatLabel, InputText, Button, useToast, Toast } from 'primevue';
import { Icon } from "@iconify/vue";

//* Store
const sqlStore = useSqlStore();

//* primevue
const toast = useToast();

const createTable = () => {
  const { isSuccess, message } = sqlStore.createTable();
  toast.add({ severity: isSuccess ? 'success' : 'error', summary: `${isSuccess ? 'Success' : 'Error'} Message`, detail: message, life: 3000 });
};
const addDialogVisible = ref(false);



</script>

<template>
  <div class="flex flex-col h-full">
    <DataTable :value="sqlStore.fields" v-model:selection="sqlStore.selectedFields" dataKey="fieldCode" size="small"
      class="flex-1">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-xl">Fleid Template</span>
          <Button @click="addDialogVisible = true" size="small">Create new template</Button>
        </div>
      </template>
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column v-for="col in sqlStore.fieldOptions" :key="col.field" :field="col.field" :header="col.header"></Column>
      <Column :rowEditor="true" class="min-w-8 w-[8%]">
        <template #body="{ data }">
          <Icon icon="material-symbols-light:delete-outline" width="24" height="24" @click="sqlStore.deleteField(data)"
            class="rounded border-red-400 text-red-400 hover:border-2" />
        </template>
      </Column>
    </DataTable>
    <div class="flex gap-4 p-2">
      <FloatLabel variant="on">
        <InputText id="createTableName" size="small" v-model="sqlStore.tableName" />
        <label for="createTableName">Table Name</label>
      </FloatLabel>
      <Toast />
      <Button @click="createTable()" size="small">Create table</Button>
    </div>
    <FieldDialog v-model:visible="addDialogVisible" @submit="sqlStore.createField(value)"></FieldDialog>
  </div>
</template>

<style scoped></style>