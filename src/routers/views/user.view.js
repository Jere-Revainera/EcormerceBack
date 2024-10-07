import { Router } from 'express';
import { showOneUser,showUsers } from '../../controllers/users.controllers.js';

const userViewsRouter = Router()

userViewsRouter.get("/users", showUsers)
userViewsRouter.get("/:uid", showOneUser)

export default userViewsRouter