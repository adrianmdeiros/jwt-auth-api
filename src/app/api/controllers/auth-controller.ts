import { Request, Response } from "express";
import { AuthUserService } from "../../domain/services/auth-user-service";
import { StatusCodes } from "http-status-codes";

export class AuthController {
    async authenticate(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const authenticateUser = new AuthUserService()
            const response = await authenticateUser.execute({ email, password });

            return res.status(StatusCodes.OK).json(response)
        } catch (err: any) {
            return res.status(err.statusCode).json({ error: err.message })
        }
    }
}