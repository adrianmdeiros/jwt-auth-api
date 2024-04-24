import { hashSync } from "bcryptjs"
import { prisma } from "../../database"
import { UserRepository } from "../repositories/user-repository"
import { StatusCodes } from "http-status-codes"
import { User } from "../models/User"
import { FindUserByEmailService } from "./find-user-by-email-service"
import { APIError } from "../../api/helpers/APIError"

interface CreateUserHttpResponse {
    id: string
    email: string
}

export class CreateUserService {
    async execute({ email, password }: Omit<User, 'id'>): Promise<CreateUserHttpResponse> {

        if (!email || !password) {
            throw new APIError('Email and password are required.', StatusCodes.UNAUTHORIZED)
        }

        const findByEmail = new FindUserByEmailService()
        const user = await findByEmail.execute(email)

        if (user) {
            throw new APIError('User already exists', StatusCodes.CONFLICT)
        }

        const userRepository = new UserRepository(prisma)

        const hashPassword = hashSync(password, 8)

        const newUser = await userRepository.save({ email, password: hashPassword })

        return {
            id: newUser.id,
            email: newUser.email,
        }
    }


}