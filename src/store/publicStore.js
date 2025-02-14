import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePublicStore = defineStore('publicStore', () => {
  const sqlTableLists = ref();

  return {
    sqlTableLists,
  };
});
