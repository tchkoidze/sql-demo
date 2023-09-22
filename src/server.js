import express, { request, response } from "express";
import { createTable } from "./config/sql.js";

const app = express();

async function init() {
  try {
    await createTable();
    serverStart();
  } catch (error) {
    console.log(error);
  }

  function serverStart() {
    app.get("/", (request, response) => {
      return response.status(200).json({ message: "works!" });
    });
    app.listen(3000);
  }
}

init();
