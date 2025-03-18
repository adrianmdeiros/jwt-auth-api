import { compare, hashSync } from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken"
import authConfig from "../../config/auth"

export class AuthService {

    async verifyPassword(password: string, userPassword: string): Promise<boolean> {
        return await compare(password, userPassword)
    }

    async generateToken(payload: JwtPayload): Promise<string> {
        const { secret, expiresIn } = authConfig.jwt
        return jwt.sign(payload, secret, { expiresIn })
    }

    hashPassword(password: string, salt: number): string{
        return hashSync(password, salt)
    }
}