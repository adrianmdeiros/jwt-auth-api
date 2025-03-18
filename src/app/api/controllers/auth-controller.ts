import { Request, Response } from "express";
import { AuthUserUseCase } from "../../domain/use-cases/auth-user-use-case";
import { StatusCodes } from "http-status-codes";
import { UserRepository } from "../../domain/repositories/user-repository";
import { prisma } from "../../database";
import { AuthService } from "../../domain/services/auth-service";

export class AuthController {
    async authenticate(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const authenticateUser = new AuthUserUseCase(new UserRepository(prisma), new AuthService())
            const response = await authenticateUser.execute({ email, password });

            return res.status(StatusCodes.OK).json(response)
        } catch (err: any) {
            return res.status(err.statusCode).json({ error: err.message })
        }
    }
}