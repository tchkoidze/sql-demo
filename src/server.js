import express, { request, response } from "express";
import pool, { createTable } from "./config/sql.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

async function init() {
  try {
    await createTable();
    serverStart();
  } catch (error) {
    console.log(error);
  }

  function serverStart() {
    app.use(bodyParser.json());
    app.use(cors());
    app.get("/api/products", async (_, response) => {
      try {
        const resultQuery = await pool.query("SELECT * FROM products");
        const rows = resultQuery.rows;
        return response.status(200).json(rows);
      } catch (error) {
        return response.status(401).json(error);
      }
    });
    app.post("/api/products", async (req, res) => {
      const { title, price } = req.body;
      try {
        const resultQuery = await pool.query(
          "INSERT INTO products(title, price) VALUES($1, $2)",
          [title, price]
        );
        const row = resultQuery.rows[0];
        return res.status(200).json(row);
      } catch (error) {
        return res.status(401).json(error);
      }
    });
    app.listen(3000);
  }
}

init();
