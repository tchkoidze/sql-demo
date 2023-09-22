import pgk from "pg";
const { Pool } = pgk;

const pool = new Pool({
  host: "dpg-ck6oi488elhc73c08c60-a",
  port: 5432,
  database: "products_x83k",
  user: "products_x83k_user",
  password: "oEiIGKvh5SqLPwI49CXjCK69uCQhoBC7",
});

export const createTable = async () => {
  return await pool.query(
    "CREATE TABLE IF NOT EXISTS products(id SERIAL PRiMARY KEY, title TEXT, price INT)"
  );
};

export default pool;
