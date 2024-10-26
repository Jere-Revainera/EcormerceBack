import User from "../models/user.model.js";
import MongoManager from "./mongo.manager.js";

const usersMongoManager = new MongoManager(User);
export default usersMongoManager;
