import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";

const authRouter = Router()

const authController = new AuthController()

authRouter.post('/api/auth', authController.authenticate)

export default authRouter