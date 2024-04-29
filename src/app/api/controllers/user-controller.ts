import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateUserService } from "../../domain/services/create-user-service";

export class UserController {
    async create(req: Request, res: Response) {
        try{
            const { email, password } = req.body

            const createUser= new CreateUserService();
            const newUser = await createUser.execute({ email, password });
            
            return res.status(StatusCodes.CREATED).json(newUser)
        }catch(err: any) {
            return res.status(err.statusCode).json({error: err.message})
        }
    }

    async read(req: Request, res: Response){
            res.send({message: 'You are allowed to see this just because u have a token'})
    }
}