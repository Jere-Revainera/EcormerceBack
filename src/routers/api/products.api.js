import { Router } from "express";
import {
  getAllProducts,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../controllers/products.controller.js";
import isValidDataProd from "../../middlewares/isValidDataProd.mid.js";

const productsApiRouter = Router()

productsApiRouter.get("/", getAllProducts);
productsApiRouter.get("/:pid", getProducts);
productsApiRouter.post("/", isValidDataProd, createProduct);
productsApiRouter.put("/:pid", updateProduct)
productsApiRouter.delete("/:pid", deleteProduct)

export default productsApiRouter