export const DATATYPES = [
  { label: 'int', value: 'int', hasLength: false },
  { label: 'varchar', value: 'varchar', hasLength: true, defaultLength: 50 },
  { label: 'nvarchar', value: 'nvarchar', hasLength: true, defaultLength: 50 },
  { label: 'text', value: 'text', hasLength: false },
  { label: 'ntext', value: 'ntext', hasLength: false },
  { label: 'datetime', value: 'datetime', hasLength: false },
  { label: 'bit', value: 'bit', hasLength: false },
  { label: 'decimal', value: 'decimal', hasLength: true, defaultLength: '18,2' },
  { label: 'float', value: 'float', hasLength: false },
  { label: 'bigint', value: 'bigint', hasLength: false },
  { label: 'smallint', value: 'smallint', hasLength: false },
  { label: 'tinyint', value: 'tinyint', hasLength: false },
];
