// 定義範例表格的結構
const sampleTables = [
  {
    name: 'users',
    columns: [
      { columnName: 'id', dataType: 'INTEGER', allowNull: false, isIdentity: true, isPrimaryKey: true },
      { columnName: 'name', dataType: 'TEXT', allowNull: false, isIdentity: false, isPrimaryKey: false },
      { columnName: 'email', dataType: 'TEXT', allowNull: false, isIdentity: false, isPrimaryKey: false },
      { columnName: 'age', dataType: 'INTEGER', allowNull: true, isIdentity: false, isPrimaryKey: false },
      {
        columnName: 'created_at',
        dataType: 'DATETIME',
        allowNull: false,
        isIdentity: false,
        isPrimaryKey: false,
      },
    ],
  },
  {
    name: 'products',
    columns: [
      { columnName: 'id', dataType: 'INTEGER', allowNull: false, isIdentity: true, isPrimaryKey: true },
      { columnName: 'name', dataType: 'TEXT', allowNull: false, isIdentity: false, isPrimaryKey: false },
      {
        columnName: 'price',
        dataType: 'DECIMAL',
        length: '10,2',
        allowNull: false,
        isIdentity: false,
        isPrimaryKey: false,
      },
      { columnName: 'category', dataType: 'TEXT', allowNull: true, isIdentity: false, isPrimaryKey: false },
      { columnName: 'stock', dataType: 'INTEGER', allowNull: false, isIdentity: false, isPrimaryKey: false },
    ],
  },
  {
    name: 'orders',
    columns: [
      { columnName: 'id', dataType: 'INTEGER', allowNull: false, isIdentity: true, isPrimaryKey: true },
      { columnName: 'user_id', dataType: 'INTEGER', allowNull: false, isIdentity: false, isPrimaryKey: false },
      { columnName: 'product_id', dataType: 'INTEGER', allowNull: false, isIdentity: false, isPrimaryKey: false },
      { columnName: 'quantity', dataType: 'INTEGER', allowNull: false, isIdentity: false, isPrimaryKey: false },
      {
        columnName: 'order_date',
        dataType: 'DATETIME',
        allowNull: false,
        isIdentity: false,
        isPrimaryKey: false,
      },
      {
        columnName: 'total_amount',
        dataType: 'DECIMAL',
        length: '10,2',
        allowNull: false,
        isIdentity: false,
        isPrimaryKey: false,
      },
    ],
  },
];

// Users 表格資料
const userInserts = [
  "INSERT INTO users (name, email, age, created_at) VALUES ('張三', 'zhang@example.com', 25, '2024-01-15 10:30:00')",
  "INSERT INTO users (name, email, age, created_at) VALUES ('李四', 'li@example.com', 30, '2024-01-16 11:15:00')",
  "INSERT INTO users (name, email, age, created_at) VALUES ('王五', 'wang@example.com', 28, '2024-01-17 09:45:00')",
  "INSERT INTO users (name, email, age, created_at) VALUES ('趙六', 'zhao@example.com', 35, '2024-01-18 14:20:00')",
  "INSERT INTO users (name, email, age, created_at) VALUES ('錢七', 'qian@example.com', 22, '2024-01-19 16:30:00')",
  "INSERT INTO users (name, email, age, created_at) VALUES ('孫八', 'sun@example.com', 27, '2024-01-20 08:15:00')",
  "INSERT INTO users (name, email, age, created_at) VALUES ('周九', 'zhou@example.com', 32, '2024-01-21 13:45:00')",
  "INSERT INTO users (name, email, age, created_at) VALUES ('吳十', 'wu@example.com', 29, '2024-01-22 10:20:00')",
  "INSERT INTO users (name, email, age, created_at) VALUES ('鄭一', 'zheng@example.com', 26, '2024-01-23 15:10:00')",
  "INSERT INTO users (name, email, age, created_at) VALUES ('陳二', 'chen@example.com', 31, '2024-01-24 12:00:00')",
];

// Products 表格資料
const productInserts = [
  "INSERT INTO products (name, price, category, stock) VALUES ('iPhone 15', 32900.00, '手機', 50)",
  "INSERT INTO products (name, price, category, stock) VALUES ('MacBook Pro', 68900.00, '筆電', 25)",
  "INSERT INTO products (name, price, category, stock) VALUES ('AirPods Pro', 7490.00, '耳機', 100)",
  "INSERT INTO products (name, price, category, stock) VALUES ('iPad Air', 19900.00, '平板', 75)",
  "INSERT INTO products (name, price, category, stock) VALUES ('Apple Watch', 12900.00, '手錶', 60)",
  "INSERT INTO products (name, price, category, stock) VALUES ('Magic Mouse', 2590.00, '周邊', 80)",
  "INSERT INTO products (name, price, category, stock) VALUES ('Magic Keyboard', 4690.00, '周邊', 45)",
  "INSERT INTO products (name, price, category, stock) VALUES ('HomePod mini', 3000.00, '音響', 30)",
  "INSERT INTO products (name, price, category, stock) VALUES ('Apple TV 4K', 5590.00, '媒體播放器', 40)",
  "INSERT INTO products (name, price, category, stock) VALUES ('AirTag', 990.00, '配件', 200)",
];

// Orders 表格資料
const orderInserts = [
  "INSERT INTO orders (user_id, product_id, quantity, order_date, total_amount) VALUES (1, 1, 1, '2024-02-01 10:30:00', 32900.00)",
  "INSERT INTO orders (user_id, product_id, quantity, order_date, total_amount) VALUES (2, 3, 2, '2024-02-02 14:15:00', 14980.00)",
  "INSERT INTO orders (user_id, product_id, quantity, order_date, total_amount) VALUES (3, 2, 1, '2024-02-03 16:45:00', 68900.00)",
  "INSERT INTO orders (user_id, product_id, quantity, order_date, total_amount) VALUES (4, 5, 1, '2024-02-04 11:20:00', 12900.00)",
  "INSERT INTO orders (user_id, product_id, quantity, order_date, total_amount) VALUES (5, 4, 1, '2024-02-05 09:30:00', 19900.00)",
  "INSERT INTO orders (user_id, product_id, quantity, order_date, total_amount) VALUES (6, 6, 3, '2024-02-06 13:10:00', 7770.00)",
  "INSERT INTO orders (user_id, product_id, quantity, order_date, total_amount) VALUES (7, 7, 1, '2024-02-07 15:45:00', 4690.00)",
  "INSERT INTO orders (user_id, product_id, quantity, order_date, total_amount) VALUES (8, 8, 2, '2024-02-08 12:30:00', 6000.00)",
  "INSERT INTO orders (user_id, product_id, quantity, order_date, total_amount) VALUES (9, 9, 1, '2024-02-09 17:20:00', 5590.00)",
  "INSERT INTO orders (user_id, product_id, quantity, order_date, total_amount) VALUES (10, 10, 5, '2024-02-10 10:15:00', 4950.00)",
];

export const getSampleData = () => ({
  sampleTables,
  userInserts,
  productInserts,
  orderInserts,
});
