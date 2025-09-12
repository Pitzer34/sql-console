import initSqlJs from 'sql.js';
import { useSqlStore } from '../store/sqlStore';
import { getSampleData } from '../services/constants/sampleData';

const buildColumnSql = (column = {}) => {
  const { columnName = '', dataType = '', length = '', allowNull = false } = column;

  if (!columnName?.trim()) {
    throw new Error('欄位名稱不能為空');
  }

  const base = `${columnName.trim()} ${dataType}`;
  const lenPart = length?.trim() ? `(${length})` : '';
  const notNullPart = allowNull ? '' : 'NOT NULL';

  return [base, lenPart, notNullPart].filter(Boolean).join(' ');
};

const buildPrimaryKeySql = (columns = [], columnSqls = []) => {
  const primaryKeys = columns.filter((c) => c.isPrimaryKey).map((c) => c.columnName);

  if (primaryKeys.length > 1) {
    throw new Error('僅允許一個 PRIMARY KEY 欄位');
  }

  // 抓出所有 AUTOINCREMENT 欄位
  const identityIndices = columns
    .map((col, index) => ({ col, index }))
    .filter(({ col }) => col.isIdentity)
    .map(({ index }) => index);

  if (identityIndices.length > 0) {
    // 有 Primary Key 有 AUTOINCREMENT
    const index = identityIndices[0];
    const col = columns[index];

    if (!col.isPrimaryKey) {
      throw new Error('AUTOINCREMENT 必須設定在 PRIMARY KEY 欄位上');
    }

    if (col.dataType !== 'INTEGER') {
      throw new Error('AUTOINCREMENT 只能用於 INTEGER 類型的 PRIMARY KEY 欄位');
    }

    const replaced = `${col.columnName} INTEGER PRIMARY KEY AUTOINCREMENT`;
    const newColumnSqls = columnSqls.slice();
    newColumnSqls[index] = replaced;
    return { columnSqls: newColumnSqls, pkSql: '' };
  } else {
    // 有 Primary Key 但沒有 AUTOINCREMENT
    const pkSql = primaryKeys.length ? `, PRIMARY KEY (${primaryKeys.join(', ')})` : '';

    return { columnSqls, pkSql };
  }
};

const createTable = (tableName = '', columns = [], onlyGetSqlStr = false) => {
  const sqlStore = useSqlStore();
  try {
    // 驗證資料表名稱
    if (!tableName?.trim()) {
      throw new Error('請輸入資料表名稱');
    }

    // 驗證欄位陣列
    if (!Array.isArray(columns) || columns.length === 0) {
      throw new Error('至少需要一個欄位');
    }

    // 建構欄位定義 SQL
    const columnSqls = columns.map(buildColumnSql);
    // 處理 PK 與 identity 的特例
    const { columnSqls: finalCols, pkSql } = buildPrimaryKeySql(columns, columnSqls);

    // 組合完整的 CREATE TABLE SQL 語句
    const createTableBody = finalCols.join(', ') + pkSql;
    const createTableSql = `CREATE TABLE ${tableName} (${createTableBody});`;

    if (onlyGetSqlStr) {
      return {
        isSuccess: true,
        message: createTableSql,
      };
    } else {
      // 執行建表 SQL
      sqlStore.sqliteDB.run(createTableSql);
      // 重新讀取資料表清單以更新狀態
      refreshTableSidebar();
      return {
        isSuccess: true,
        message: `建立資料表: ${tableName} 成功`,
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message || String(error),
    };
  }
};

const deleteTable = (tableName = '') => {
  try {
    const sqlStore = useSqlStore();
    // 執行刪表 SQL
    sqlStore.sqliteDB.run(`DROP TABLE IF EXISTS ${tableName};`);

    // 重新讀取資料表清單以更新狀態
    refreshTableSidebar();

    return {
      isSuccess: true,
      message: `資料表 "${tableName}" 已刪除`,
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: `建立資料表 ${table.name} 失敗: ${error.message || String(error)}`,
    };
  }
};

const getTableColumns = (tableName = '') => {
  try {
    const sqlStore = useSqlStore();
    // 取得資料表結構資訊
    const result = sqlStore.sqliteDB.exec(`PRAGMA table_info(${tableName});`);
    const columns = result?.[0]?.values ?? [];

    // 沒有資料表結構資訊就回傳空陣列
    if (!columns.length) return [];

    // 將查詢結果轉換為易於使用的物件格式
    return columns.map((col) => ({
      cid: col[0], // 欄位 ID
      name: col[1], // 欄位名稱
      type: col[2], // 資料型別
      allowNull: col[3] === 0, // 是否允許 NULL (0=允許, 1=不允許)
      isPrimaryKey: col[5] === 1, // 是否為主鍵 (1=是主鍵, 0=不是)
    }));
  } catch (error) {
    console.error(`讀取表格 ${tableName} 欄位資訊失敗:`, error);
    return [];
  }
};

const getTableInfo = (targetTableName = '') => {
  try {
    const sqlStore = useSqlStore();
    // 查詢系統表獲取所有資料表
    const result = sqlStore.sqliteDB.exec("SELECT * FROM sqlite_master WHERE type='table';");
    const tables = result?.[0]?.values ?? [];

    // 沒有資料表就回傳空陣列
    if (!tables.length) return [];

    // 為每個資料表取得欄位資訊
    const allTablesWithColumns = tables.map((row) => {
      const tableName = row[1]; // 資料表名稱在第二個欄位
      return {
        name: tableName,
        columns: getTableColumns(tableName),
      };
    });

    return targetTableName
      ? allTablesWithColumns.filter((table) => table.name === targetTableName)
      : allTablesWithColumns;
  } catch (error) {
    console.error('讀取資料表失敗:', error);
    return [];
  }
};

const refreshTableSidebar = () => {
  const sqlStore = useSqlStore();
  const tableInfo = getTableInfo();
  sqlStore.tables = tableInfo;
};

const mountSampleSqliteData = () => {
  const sqlStore = useSqlStore();
  const { sampleTables, userInserts, productInserts, orderInserts } = getSampleData();

  try {
    const details = [];

    // 建立範例資料表
    sampleTables.forEach((table) => {
      const result = createTable(table.name, table.columns);
      if (result.isSuccess) {
        details.push(`建立資料表: ${table.name} 成功`);
      } else {
        throw new Error(`建立資料表 ${table.name} 失敗: ${error.message || String(error)}`);
      }
    });

    // 執行所有插入語句
    const allInserts = [
      { table: 'users', inserts: userInserts },
      { table: 'products', inserts: productInserts },
      { table: 'orders', inserts: orderInserts },
    ];

    allInserts.forEach(({ table, inserts }) => {
      inserts.forEach((sql, index) => {
        sqlStore.sqliteDB.run(sql);
      });
      details.push(`已插入 ${inserts.length} 筆資料至 ${table} 資料表`);
    });

    refreshTableSidebar();

    return {
      isSuccess: true,
      message: details,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      message: `SQLite範例資料掛載失敗: ${error.message || String(error)}`,
    };
  }
};

const getSampleSqliteDataExcuteStr = () => {
  const { sampleTables, userInserts, productInserts, orderInserts } = getSampleData();
  let generatedSqlStatements = '';

  try {
    sampleTables.forEach((table) => {
      const result = createTable(table.name, table.columns, true);
      if (result.isSuccess) {
        // 將建表 SQL 加入字串變數
        generatedSqlStatements += `-- 建立 ${table.name} 資料表\n${result.message}\n\n`;
      } else {
        throw new Error(`建立資料表 ${table.name} 字串失敗: ${error.message || String(error)}`);
      }
    });

    const allInserts = [
      { table: 'users', inserts: userInserts },
      { table: 'products', inserts: productInserts },
      { table: 'orders', inserts: orderInserts },
    ];

    allInserts.forEach(({ table, inserts }) => {
      // 將插入 SQL 加入字串變數
      generatedSqlStatements += `-- 插入 ${table} 資料表資料\n`;
      inserts.forEach((sql, index) => {
        generatedSqlStatements += `${sql};\n`;
      });
      generatedSqlStatements += '\n';
    });

    return {
      isSuccess: true,
      message: generatedSqlStatements,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      message: `SQLite範例資料指令取得失敗: ${error.message || String(error)}`,
    };
  }
};

export const useSqlite = () => ({
  createTable,
  deleteTable,
  refreshTableSidebar,
  mountSampleSqliteData,
  getSampleSqliteDataExcuteStr,
});
