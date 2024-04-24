import { PrismaClient } from "@prisma/client";
import  { User }  from "../models/User";

export interface SavedUser {
    id: string
    email: string
}

export class UserRepository {
    constructor(private db: PrismaClient){}

    async save(user: Omit<User, 'id'>): Promise<SavedUser>{
        const savedUser = await this.db.user.create({
            data: user,
            select:{
                id: true,
                email: true
            }
        })
        return savedUser
    }

    async findBy(email: string): Promise<User | null>{
        const user = await this.db.user.findUnique({
            where: {
                email
            }
        })
        return user
    }

}