import express, { request, response } from "express";
import pool, { createTable } from "./config/sql.js";

const app = express();

async function init() {
  try {
    await createTable();
    serverStart();
  } catch (error) {
    console.log(error);
  }

  function serverStart() {
    app.get("/api/products", async (_, response) => {
      try {
        const resultQuery = await pool.query("SELECT * FROM products");
        const rows = resultQuery.rows;
        return response.status(200).json(rows);
      } catch (error) {
        return response.status(401).json(error);
      }
    });
    app.listen(3000);
  }
}

init();
