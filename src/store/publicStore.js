import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePublicStore = defineStore('publicStore', () => {
  const sqlTableLists = ref();
  const fieldOptions = ref([
    { field: 'fieldCode', header: 'field Code' },
    { field: 'type', header: 'Type' },
    { field: 'length', header: 'Length' },
    { field: 'primaryKey', header: 'PK' },
    { field: 'allowNull', header: 'Null' },
    { field: 'default', header: 'Default' },
  ]);
  const fieldTemplates = ref([
    {
      fieldCode: 'id',
      type: 'int',
      length: '',
      primaryKey: true,
      allowNull: false,
      default: 1,
    },
    {
      fieldCode: 'name',
      type: 'nvarchar',
      length: '10',
      primaryKey: false,
      allowNull: false,
      default: 'JHON',
    },
    {
      fieldCode: 'hired_on',
      type: 'date',
      length: '',
      primaryKey: false,
      allowNull: true,
      default: '2000-01-01',
    },
  ]);

  return {
    sqlTableLists,
    fieldOptions,
    fieldTemplates,
  };
});
