import { defineStore } from 'pinia';
import { ref } from 'vue';
import initSqlJs from 'sql.js';

export const useSqlStore = defineStore('sqlStore', () => {
  //* 資料表清單
  const tables = ref([]);
  //* SQLite資料庫實例
  const sqliteDB = ref(null);

  const initSqliteDB = async () => {
    try {
      const SQL = await initSqlJs({
        locateFile: (file) => `https://sql.js.org/dist/${file}`,
      });

      sqliteDB.value = new SQL.Database();
    } catch (error) {
      console.error('SQLite 初始化失敗:', error);
    }
  };

  //* 訊息顯示秒數(ms)
  const toastTime = ref(5000);

  return {
    tables,
    sqliteDB,
    initSqliteDB,
    toastTime,
  };
});
