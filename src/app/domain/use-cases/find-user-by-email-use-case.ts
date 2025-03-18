import { User } from "../models/User";
import { UserRepository } from "../repositories/user-repository";

export class FindUserByEmailService {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async execute(email: string): Promise<User | null>{
        const user = await this.userRepository.findByEmail(email)
        return user;
    }
    
}