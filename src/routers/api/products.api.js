import { Router } from "express";
import {
  create,
  destroy,
  readAll,
  paginate,
  read,
  update,
} from "../../mongo/controller/products.controller.js";

const productsApiRouter = Router();

productsApiRouter.post("/", create);
productsApiRouter.get("/", readAll);
productsApiRouter.get("/paginate", paginate);
productsApiRouter.get("/:pid", read);
productsApiRouter.put("/:pid", update);
productsApiRouter.delete("/:pid", destroy);

export default productsApiRouter;
