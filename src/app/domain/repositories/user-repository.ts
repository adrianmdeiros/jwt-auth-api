import { PrismaClient } from "@prisma/client";
import  { User }  from "../models/User";

export interface UserData {
    id: string
    email: string
}

export class UserRepository {
    constructor(private db: PrismaClient){}

    async save(user: Omit<User, 'id'>): Promise<UserData>{
        const savedUser = await this.db.user.create({
            data: user,
            select:{
                id: true,
                email: true
            }
        })
        return savedUser
    }

    async findBy(email: string): Promise<UserData | null>{
        const user = await this.db.user.findUnique({
            where: {
                email
            },
            select:{
                id: true,
                email: true
            }
        })
        return user
    }

}