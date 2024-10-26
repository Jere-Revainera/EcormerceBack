import Cart from "../models/cart.model.js";
import MongoManager from "./mongo.manager.js";

const cartsMongoManager = new MongoManager(Cart)
export default cartsMongoManager