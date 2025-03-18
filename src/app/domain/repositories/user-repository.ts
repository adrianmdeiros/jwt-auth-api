import { PrismaClient } from "@prisma/client";
import  { User }  from "../models/User";

export interface SavedUser {
    id: string
    email: string
}

export class UserRepository {
    constructor(private readonly db: PrismaClient){}

    async findAll(): Promise<SavedUser[] | null>{
        const users = await this.db.user.findMany({
            select: {
                id: true,
                email: true
            }
        })
        
        return users
    }

    async save(user: Omit<User, 'id'>): Promise<SavedUser>{
        const savedUser = await this.db.user.create({
            data: user
        })
        return savedUser
    }

    async findByEmail(email: string): Promise<User | null>{
        const user = await this.db.user.findUnique({
            where: {
                email
            }
        })
        return user
    }

}