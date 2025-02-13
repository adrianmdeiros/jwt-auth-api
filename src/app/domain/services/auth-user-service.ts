import jwt from 'jsonwebtoken';
import authConfig from "../../config/auth";
import { User } from "../models/User";
import { compare } from "bcryptjs";
import { FindUserByEmailService } from "./find-user-by-email-service";
import { StatusCodes } from "http-status-codes";
import { APIError } from '../../api/helpers/APIError';

interface AuthHttpResponse {
    token: string
}

export class AuthUserService {
    async execute({ email, password }: Omit<User, 'id'>): Promise<AuthHttpResponse> {

        if (!email || !password) {
            throw new APIError('Email and password are required.', StatusCodes.UNAUTHORIZED)
        }

        const findByEmail = new FindUserByEmailService()
        const user = await findByEmail.execute(email)

        if (!user) {
            throw new APIError('Invalid email', StatusCodes.UNAUTHORIZED)
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            throw new APIError('Invalid password', StatusCodes.UNAUTHORIZED)
        }
            
        const { id } = user
        const tokenPayload = {
            user: {
                id,
                email
            } as User
        }
        const { secret, expiresIn } = authConfig.jwt
        const token = jwt.sign(tokenPayload, secret!, { expiresIn })

        return token
    }
}
