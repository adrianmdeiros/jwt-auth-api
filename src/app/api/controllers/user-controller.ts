import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateUserUseCase } from "../../domain/use-cases/create-user-use-case";
import { FindAllUsersUseCase } from "../../domain/use-cases/find-all-users-use-case";
import { UserRepository } from "../../domain/repositories/user-repository";
import { prisma } from "../../database";
import { AuthService } from "../../domain/services/auth-service";

export class UserController {
    async create(req: Request, res: Response) {
        try{
            const { email, password } = req.body

            const createUser = new CreateUserUseCase(new UserRepository(prisma), new AuthService());
            const newUser = await createUser.execute({ email, password });
            
            return res.status(StatusCodes.CREATED).json(newUser)
        }catch(err: any) {
            return res.status(err.statusCode).json({error: err.message})
        }
    }

    async read(req: Request, res: Response){
        try {
            const findAll = new FindAllUsersUseCase(new UserRepository(prisma))
            const users = await findAll.execute()
            
            return res.status(StatusCodes.OK).json(users)
        } catch (err: any) {
            return res.status(err.statusCode).json({ error: err.message })
        }
    }
}