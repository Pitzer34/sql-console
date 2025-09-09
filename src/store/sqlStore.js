import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import initSqlJs from 'sql.js';

const SQL = await initSqlJs({
  locateFile: (file) => `https://sql.js.org/dist/${file}`,
});

const db = new SQL.Database();

const buildColumnSql = (col) => {
  const { columnName, dataType, length, allowNull, isIdentity } = col;
  if (!columnName?.trim()) {
    throw new Error('欄位名稱不能為空');
  }

  return [
    `${columnName} ${dataType}`,
    length?.trim() ? `(${length})` : '',
    allowNull ? '' : 'NOT NULL',
    isIdentity ? 'AUTOINCREMENT' : '',
  ]
    .join(' ')
    .trim();
};

const buildPrimaryKeySql = (columns = []) => {
  const primaryKeys = columns.filter((col) => col.isPrimaryKey).map((col) => col.columnName);
  return primaryKeys.length ? `, PRIMARY KEY (${primaryKeys.join(', ')})` : '';
};

export const useSqlStore = defineStore('sqlStore', () => {
  const tables = ref([]);

  const readTable = () => {
    try {
      const result = db.exec("SELECT * FROM sqlite_master WHERE type='table';");
      if (result.length && result[0].values.length) {
        const tablesWithColumns = result[0].values.map((row) => {
          const tableName = row[1];
          const columnInfo = getTableColumns(tableName);
          return {
            name: tableName,
            columns: columnInfo,
          };
        });

        tables.value = tablesWithColumns;
      } else {
        tables.value = [];
      }
    } catch (error) {
      console.log('讀取資料表失敗:', error);
      tables.value = [];
    }
  };

  const getTableColumns = (tableName) => {
    try {
      const columnResult = db.exec(`PRAGMA table_info(${tableName});`);
      console.log(columnResult);
      if (columnResult.length && columnResult[0].values.length) {
        return columnResult[0].values.map((col) => ({
          cid: col[0],
          name: col[1],
          type: col[2],
          allowNull: col[3] === 0,
          isPrimaryKey: col[5] === 1,
        }));
      } else {
        return [];
      }
    } catch (error) {
      console.log(`讀取表格 ${tableName} 欄位資訊失敗:`, error);
      return [];
    }
  };

  const createTable = (tableName, columns) => {
    try {
      if (!tableName?.trim()) {
        throw new Error('請輸入資料表名稱');
      }

      if (!Array.isArray(columns) || columns.length === 0) {
        throw new Error('至少需要一個欄位');
      }
      const fieldClause = columns.map(buildColumnSql).join(', ');
      const primaryKeyClause = buildPrimaryKeySql(columns);
      const createTableSqlStr = `CREATE TABLE ${tableName} (${fieldClause}${primaryKeyClause})`;

      db.run(createTableSqlStr);
      readTable();

      return {
        isSuccess: true,
        message: `資料表 "${tableName}" 已建立`,
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: error.message || String(error),
      };
    }
  };

  const deleteTable = (tableName) => {
    try {
      db.run(`DROP TABLE IF EXISTS ${tableName};`);
      readTable();
      return {
        isSuccess: true,
        message: `資料表 "${tableName}" 已刪除`,
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: error.message || String(error),
      };
    }
  };

  return {
    tables,
    createTable,
    readTable,
    deleteTable,
  };
});
