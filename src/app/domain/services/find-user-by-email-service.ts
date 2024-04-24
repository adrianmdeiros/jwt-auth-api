import { prisma } from "../../database";
import { UserData, UserRepository } from "../repositories/user-repository";

export class FindUserByEmailService {
    async execute(email: string): Promise<UserData | null>{
        const userRepository = new UserRepository(prisma)
        const user = await userRepository.findBy(email);
        return user;
    }
}