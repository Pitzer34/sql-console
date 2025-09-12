export const DATATYPES = [
  { label: 'integer', value: 'INTEGER', hasLength: false },
  { label: 'text', value: 'TEXT', hasLength: false },
  { label: 'real', value: 'REAL', hasLength: false },
  { label: 'numeric', value: 'NUMERIC', hasLength: false },
  { label: 'blob', value: 'BLOB', hasLength: false },
  { label: 'varchar', value: 'VARCHAR', hasLength: true, defaultLength: 50 },
  { label: 'char', value: 'CHAR', hasLength: true, defaultLength: 10 },
  { label: 'decimal', value: 'DECIMAL', hasLength: true, defaultLength: '10,2' },
  { label: 'boolean', value: 'BOOLEAN', hasLength: false },
  { label: 'date', value: 'DATE', hasLength: false },
  { label: 'datetime', value: 'DATETIME', hasLength: false },
  { label: 'timestamp', value: 'TIMESTAMP', hasLength: false },
];

export class COLUMNS {
  constructor(id = 0) {
    this.id = id;
    this.columnName = '';
    this.dataType = DATATYPES[0].value;
    this.length = '';
    this.allowNull = false;
    this.isPrimaryKey = false;
    this.isIdentity = false;
    this.selected = false;
  }
}
