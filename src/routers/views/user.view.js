import { Router } from 'express';
import { showOne,show } from '../../mongo/controller/user.controller.js';

const userViewsRouter = Router()

userViewsRouter.get("/users", show)
userViewsRouter.get("/:uid", showOne)

export default userViewsRouter