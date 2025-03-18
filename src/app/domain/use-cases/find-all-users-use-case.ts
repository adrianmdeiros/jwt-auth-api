import { SavedUser } from "../repositories/user-repository"
import { UserRepository } from "../repositories/user-repository"

export class FindAllUsersUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute(): Promise<SavedUser[] | null> {
        return await this.userRepository.findAll()   
    }
}