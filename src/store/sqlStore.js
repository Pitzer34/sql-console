import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import db from '../composables/sql.js';

export const useSqlStore = defineStore('sqlStore', () => {
  //* State
  const fieldOptions = [
    { field: 'fieldCode', header: 'field Code' },
    { field: 'type', header: 'Type' },
    { field: 'length', header: 'Length' },
    { field: 'primaryKey', header: 'PK' },
    { field: 'allowNull', header: 'Null' },
    { field: 'defaultValue', header: 'Default' },
  ];
  const fields = ref([
    {
      fieldCode: 'id',
      type: 'int',
      length: '',
      primaryKey: true,
      allowNull: false,
      defaultValue: 1,
    },
    {
      fieldCode: 'name',
      type: 'nvarchar',
      length: '10',
      primaryKey: false,
      allowNull: false,
      defaultValue: 'JHON',
    },
    {
      fieldCode: 'hired_on',
      type: 'date',
      length: '',
      primaryKey: false,
      allowNull: true,
      defaultValue: '2000-01-01',
    },
  ]);
  const tableName = ref('employees');
  const selectedFields = ref([]);
  const tableCount = ref(0);

  //* Getters
  const tableNames = computed(() => {
    if (tableCount.value === 0) return [];
    return getTableNames();
  });

  const tableLists = computed(() => {
    if (tableCount.value === 0) return [];
    const tableNames = getTableNames();
    const tables = tableNames.map((tableName) => ({
      label: tableName,
      items: getTableFields(tableName),
    }));
    return tables;
  });

  //* Actions
  const createField = (value) => {
    fields.value.push(value);
  };

  const deleteField = (row) => {
    const index = fields.value.indexOf(row);
    if (index > -1) {
      fields.value.splice(index, 1);
    }
  };

  const getTableNames = () => {
    const result = db.exec("SELECT name FROM sqlite_master WHERE type='table';");
    return result.length ? result[0].values.map((item) => item[0]) : [];
  };

  const getTableFields = (tableName = '') => {
    const result = db.exec(`PRAGMA table_info(${tableName});`);
    return result.length ? result[0].values.map((field) => ({ label: field[1] })) : [];
  };

  const createTable = () => {
    // 定義欄位, 每一個欄位會依據屬性組合成對應的 SQL 語法
    const fieldClause = selectedFields.value
      .map((field) => {
        const { fieldCode, type, length, allowNull, defaultValue } = field;
        let str = `${fieldCode} ${type}`;
        if (length) str += ` (${length})`;
        if (allowNull === false) str += ' NOT NULL';
        if (defaultValue !== null) str += ` DEFAULT '${defaultValue}'`;
        return str;
      })
      .join(', ');

    // 定義 PK 的 SQL 語法
    const primaryKeys = selectedFields.value
      .filter((field) => field.primaryKey)
      .map((field) => field.fieldCode);
    const primaryKeyClause = primaryKeys.length ? `, PRIMARY KEY (${primaryKeys.join(', ')})` : '';

    // 組合完整的 Create Table SQL 指令
    let createTableSqlStr = 'CREATE TABLE';
    if (tableName.value) {
      createTableSqlStr += ` ${tableName.value}`;
      if (fieldClause && primaryKeyClause) {
        createTableSqlStr += ` (${fieldClause}${primaryKeyClause})`;
      }
    }

    try {
      db.run(createTableSqlStr);
      const result = db.exec("SELECT Count(*) FROM sqlite_master WHERE type='table';");
      tableCount.value = result.length ? result[0].values[0][0] : 0;
      return {
        isSuccess: true,
        message: 'Create Success!',
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: error.message || error,
      };
    }
  };

  const deleteTable = (tableName = '') => {
    db.run(`DROP TABLE IF EXISTS ${tableName};`);
    tableCount.value -= 1;
  };

  const exportTable = (tableName = '') => {
    const res = db.exec(`PRAGMA table_info(${tableName});`);
    const columns = res[0].values.map((row) => {
      const cid = row[0];
      const name = row[1];
      const type = row[2];
      const notNull = row[3];
      const dflt_value = row[4];
      const pk = row[5];

      let columnDef = `${name} ${type}`;
      if (notNull) columnDef += ' NOT NULL';
      if (dflt_value !== null) columnDef += ` DEFAULT ${dflt_value}`;

      return { columnDef, pk };
    });

    const primaryKeys = columns.filter((col) => col.pk).map((col) => col.columnDef.split(' ')[0]);

    let columnSQL = `${columns.map((col) => col.columnDef).join(',\n ')}`;
    if (primaryKeys.length > 0) {
      columnSQL += `\n PRIMARY KEY (${primaryKeys.join(', ')})`;
    }

    return `CREATE TABLE ${tableName} \n(${columnSQL})`;
  };

  const setExampleTable = () => {
    db.run(
      "CREATE TABLE employees (id INT NOT NULL DEFAULT '1', name nvarchar (10) NOT NULL DEFAULT 'JHON', hired_on date DEFAULT '2000-01-01', PRIMARY KEY (id))"
    );
    tableCount.value += 1;
  };

  return {
    tableName,
    fieldOptions,
    fields,
    selectedFields,
    tableNames,
    tableLists,
    createField,
    deleteField,
    createTable,
    deleteTable,
    exportTable,
    setExampleTable,
  };
});
