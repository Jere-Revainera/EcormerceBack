import { Router } from "express";
import { getAllUsers,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} from "../../controllers/users.controllers.js"
import isValidDataUser from "../../middlewares/isValidDataUser.mid.js";


const usersApiRouter = Router()

usersApiRouter.get("/", getAllUsers);
usersApiRouter.get("/:uid", getUsers);
usersApiRouter.post("/",isValidDataUser, createUser)
usersApiRouter.put("/:uid",updateUser)
usersApiRouter.delete("/:uid", deleteUser)

export default usersApiRouter