import { JwtPayload } from 'jsonwebtoken';
import { User } from "../models/User";
import { StatusCodes } from "http-status-codes";
import { APIError } from '../../api/helpers/APIError';
import { UserRepository } from '../repositories/user-repository';
import { AuthService } from '../services/auth-service';

interface AuthUserHttpResponse {
    token: string
}

export class AuthUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly authService: AuthService
    ) { }

    async execute({ email, password }: Omit<User, 'id'>): Promise<AuthUserHttpResponse> {
        this.verifyInputs(email, password)
        const user = await this.verifyIfUserExists(email)
        await this.verifyIfPasswordMatched(password, user.password)
        const token = await this.generateToken({ id: user.id })
        return { token }
    }

    verifyInputs(email: string, password: string) {
        if (!email || !password) {
            throw new APIError('Email and password are required.', StatusCodes.UNAUTHORIZED)
        }
    }

    async verifyIfUserExists(email: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email)
        if (!user) {
            throw new APIError('Invalid credential.', StatusCodes.UNAUTHORIZED)
        }
        return user
    }

    async verifyIfPasswordMatched(password: string, userPassword: string) {
        const passwordMatched = await this.authService.verifyPassword(password, userPassword)
        if (!passwordMatched) {
            throw new APIError('Invalid credendial.', StatusCodes.UNAUTHORIZED)
        }
    }

    async generateToken(payload: JwtPayload) {
        return await this.authService.generateToken(payload)
    }

}