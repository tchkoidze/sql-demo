import pool from "../config/sql.js";

export const getAllProducts = async (_, response) => {
  try {
    const resultQuery = await pool.query("SELECT * FROM products");
    const rows = resultQuery.rows;
    return response.status(200).json(rows);
  } catch (error) {
    return response.status(401).json(error);
  }
};

export const createProduct = async (req, res) => {
  const { title, price } = req.body;
  try {
    const resultQuery = await pool.query(
      "INSERT INTO products(title, price) VALUES($1, $2)",
      [title, price]
    );
    const row = resultQuery.rows[0];
    return res.status(201).json(row);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const deleteProduct = async (req, res) => {
  const id = +req.params.id;

  try {
    await pool.query("DELETE FROM products WHERE id=$1", [id]);
    return res.status(201).json({ message: "product deleted!" });
  } catch (error) {
    return res.status(401).json(error);
  }
};
