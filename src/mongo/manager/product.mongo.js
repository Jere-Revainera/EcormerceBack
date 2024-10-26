import Product from "../models/product.model.js";
import MongoManager from "./mongo.manager.js";

const productsMongoManager = new MongoManager(Product);
export default productsMongoManager;