import { Router } from "express";
import { showOne, show } from "../../mongo/controller/products.controller.js";

const productsViewRouter = Router()

productsViewRouter.get("/", show)
productsViewRouter.get("/:pid", showOne)

export default productsViewRouter