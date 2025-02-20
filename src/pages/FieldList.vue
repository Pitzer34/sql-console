<script setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { usePublicStore } from '../store/publicStore.js';
import FieldDialog from '../components/FieldDialog.vue';
import db from '../composables/sql.js';
import { DataTable, Column, FloatLabel, InputText, Button } from 'primevue';
import { Icon } from "@iconify/vue";

//* PiniaStore
const publicStore = usePublicStore();
const { sqlTableLists, fieldTemplates } = storeToRefs(publicStore);

const addDialogVisible = ref(false);
const addNewFieldTemplate = (value) => {
  fieldTemplates.value.push(value);
}

const selectedFields = ref();
const tableNm = ref('employees');

const createTable = () => {
  console.log(selectedFields.value);
  const fields = selectedFields.value.map(field => {
    const { fieldCode, type, length, allowNull, default: defaultValue } = field;
    let fieldStr = `${fieldCode} ${type}`;
    if (length) fieldStr += ` (${length})`;
    if (!allowNull) fieldStr += ' NOT NULL';
    if (defaultValue) fieldStr += ` DEFAULT '${defaultValue}'`;

    return fieldStr;
  });
  console.log(fields);

  const primaryKeyFields = selectedFields.value.filter(field => field.primaryKey).map(field => field.fieldCode);
  console.log(primaryKeyFields)

  let primaryKeyStr = '';
  if (primaryKeyFields.length > 0) primaryKeyStr = `, PRIMARY KEY (${primaryKeyFields.join(', ')})`;

  const createTableSqlStr = `CREATE TABLE ${tableNm.value} (${fields.join(', ')}${primaryKeyStr});`;
  console.log(createTableSqlStr)

  db.run(createTableSqlStr);
  sqlTableLists.value = db.exec("SELECT name FROM sqlite_master WHERE type='table';")[0]?.values.map(item => item[0]);
  console.log(sqlTableLists.value);
}

const deleteTemplate = (row) => {
  const index = fieldTemplates.value.indexOf(row);
  if (index > -1) {
    fieldTemplates.value.splice(index, 1);
  }
}

// const createTableSqlStr = "CREATE TABLE test(id int, name nvarchar(10))";
// const addDataSqlStr = "INSERT INTO test VALUES(0, 'HELLO'); \ INSERT INTO test VALUES(1, 'WORLD');";

// db.run(createTableSqlStr);
// db.run(addDataSqlStr);

// console.log(db.exec("SELECT * FROM test;"));
// console.log(db.exec("SELECT name FROM sqlite_master WHERE type='table';"))
// console.log(db.exec("SELECT sql FROM sqlite_master WHERE type='table' AND name='test';"))


</script>

<template>
  <div class="flex flex-col h-full">
    <DataTable :value="fieldTemplates" v-model:selection="selectedFields" dataKey="fieldCode" size="small"
      class="flex-1">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-xl">Fleid Template</span>
          <Button @click="addDialogVisible = true" size="small">Create new template</Button>
        </div>
      </template>
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column v-for="col in publicStore.fieldOptions" :key="col.field" :field="col.field" :header="col.header"></Column>
      <Column :rowEditor="true" class="min-w-8 w-[8%]">
        <template #body="{ data }">
          <Icon icon="material-symbols-light:delete-outline" width="24" height="24" @click="deleteTemplate(data)"
            class="rounded border-red-400 text-red-400 hover:border-2" />
        </template>
      </Column>
    </DataTable>
    <div class="flex gap-4 p-2">
      <FloatLabel variant="on">
        <InputText id="createTableName" size="small" v-model="tableNm" />
        <label for="createTableName">Table Name</label>
      </FloatLabel>
      <Button @click="createTable" size="small">Create table</Button>
    </div>
    <FieldDialog v-model:visible="addDialogVisible" @submit="addNewFieldTemplate"></FieldDialog>
  </div>
</template>

<style scoped></style>