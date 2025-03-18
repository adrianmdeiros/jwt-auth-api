import { UserRepository } from "../repositories/user-repository"
import { StatusCodes } from "http-status-codes"
import { User } from "../models/User"
import { APIError } from "../../api/helpers/APIError"
import { AuthService } from "../services/auth-service"

interface CreateUserHttpResponse {
    id: string
    email: string
}

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly authService: AuthService
    ) { }

    async execute({ email, password }: Omit<User, 'id'>): Promise<CreateUserHttpResponse> {
        this.verifyInputs(email, password)
        await this.verifyIfUserExists(email)
        const hashedPassword = this.authService.hashPassword(password, 8)
        const newUser = await this.userRepository.save({ email, password: hashedPassword })
        return {
            id: newUser.id,
            email: newUser.email,
        }
    }

    verifyInputs(email: string, password: string) {
        if (!email || !password) {
            throw new APIError('Email and password are required.', StatusCodes.UNAUTHORIZED)
        }
    }

    async verifyIfUserExists(email: string): Promise<APIError | void> {
        const user = await this.userRepository.findByEmail(email)
        if (user) {
            throw new APIError('User already exists.', StatusCodes.UNAUTHORIZED)
        }
    }

}