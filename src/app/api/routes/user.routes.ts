import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { ensureAuth } from "../middlewares/ensureAuth";

const userRouter = Router()

const userController = new UserController()

userRouter.post('/api/users', userController.create)
userRouter.get('/api/users', ensureAuth, userController.read)

export default userRouter