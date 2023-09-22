import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/products-controller.js";

const productRouter = express.Router();

productRouter.get("/products", getAllProducts);
productRouter.post("/products", createProduct);
productRouter.delete("/products/:id", deleteProduct);

export default productRouter;
