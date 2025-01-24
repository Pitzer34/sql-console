<script setup>
import { computed, ref } from 'vue';
import FieldDialog from '../components/FieldDialog.vue';
import db from '../composables/sql.js';
import PanelMenu from 'primevue/panelmenu';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const fieldTemplate = ref([]);

fieldTemplate.value.push({
  fieldCode: 'id',
  // fieldName: '測試用id',
  type: 'int',
  length: '',
  primaryKey: true,
  allowNull: false,
  // comment: 'pk',
  default: 'pkpk'
});
fieldTemplate.value.push({
  fieldCode: 'test',
  // fieldName: '測試用',
  type: 'nvarchar',
  length: '10',
  primaryKey: false,
  allowNull: true,
  // comment: '測試comment',
  default: 'hi'
});

const columns = [
  { field: 'fieldCode', header: 'field Code' },
  // { field: 'fieldName', header: 'fieldName' },
  { field: 'type', header: 'Type' },
  { field: 'length', header: 'Length' },
  { field: 'primaryKey', header: 'PK' },
  { field: 'allowNull', header: 'Null' },
  // { field: 'comment', header: 'Comment' },
  { field: 'default', header: 'Default' }
];

const addDialogVisible = ref(false);
const addNewFieldTemplate = (value) => {
  fieldTemplate.value.push(value);
}

const tableList = ref();
const tableListItems = computed(() => {
  if (!tableList.value) return;
  return tableList.value.map((table) => {
    const fieldCode = db.exec(`PRAGMA table_info(${table});`)[0].values.map((field) => {
      return { label: field[1] }
    });
    console.log(fieldCode)
    return {
      label: table,
      items: fieldCode,
    }
  });
});
const selectedFields = ref();
const tableNm = ref('testtable');
const createTable = () => {
  console.log(selectedFields.value);
  const fields = selectedFields.value.map(field => {
    const { fieldCode, type, length, allowNull, default: defaultValue } = field;
    let fieldStr = `${fieldCode} ${type}`;
    if (length) fieldStr += ` (${length})`;
    if (!allowNull) fieldStr += ' NOT NULL';
    if (defaultValue) fieldStr += ` DEFAULT '${defaultValue}'`;
    // if (fieldName) fieldStr += ` COMMENT '${fieldName}'`;

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
  tableList.value = db.exec("SELECT name FROM sqlite_master WHERE type='table';")[0]?.values.map(item => item[0]);
  console.log(tableList.value);
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
  <div class="grid grid-cols-3 gap-2 mx-10">
    <div class="col-span-1 border rounded p-2 bg-white">
      <PanelMenu :model="tableListItems" multiple />
      <div class="">
        <!-- <template v-for="i in tableList">
          <div class="border-2 w-full">
            {{ i }}
          </div>
        </template> -->
      </div>
    </div>
    <div class="col-span-2 border-2 rounded p-2 bg-white">
      <DataTable :value="fieldTemplate" v-model:selection="selectedFields" dataKey="fieldCode" size="small"
        class="h-dvh">
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-xl">Fleid Template</span>
            <Button @click="addDialogVisible = true" size="small">Create new template</Button>
          </div>
        </template>
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header"></Column>
        <template #footer>
          <div class="flex gap-4 mt-2">
            <FloatLabel variant="on">
              <InputText id="createTableName" size="small" v-model="tableNm" />
              <label for="createTableName">Table Name</label>
            </FloatLabel>
            <Button @click="createTable" size="small">Create table</Button>
          </div>
        </template>
      </DataTable>
    </div>
    <FieldDialog v-model:visible="addDialogVisible" @submit="addNewFieldTemplate"></FieldDialog>
  </div>
</template>

<style scoped></style>