import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { ensureAuth } from "../middlewares/ensure-auth";
import { validateEmail } from "../middlewares/validate-email";

const userRouter = Router()

const userController = new UserController()

userRouter.post('/api/users', validateEmail, userController.create)
userRouter.get('/api/users', ensureAuth, userController.read)

export default userRouter