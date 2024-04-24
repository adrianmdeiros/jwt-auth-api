import { Router } from "express";
import userRouter  from "./user.routes";
import authRouter from "./auth.routes";

export const routes = Router()

routes.use(userRouter)
routes.use(authRouter)
