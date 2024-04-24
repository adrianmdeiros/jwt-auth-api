import { prisma } from "../../database";
import { User } from "../models/User";
import { UserRepository } from "../repositories/user-repository";

export class FindUserByEmailService {
    async execute(email: string): Promise<User | null>{
        const userRepository = new UserRepository(prisma)
        const user = await userRepository.findBy(email);
        return user;
    }
}