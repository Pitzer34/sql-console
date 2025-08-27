import initSqlJs from 'sql.js';

const SQL = await initSqlJs({
  locateFile: (file) => `https://sql.js.org/dist/${file}`,
});

const db = new SQL.Database();

export default db;
