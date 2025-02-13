import jwt from 'jsonwebtoken'
import authConfig from "../../config/auth";
import { User } from "../../domain/models/User"
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

interface TokenPayload {
    user: User
    iat: number
    exp: number
}

export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if(!authorization){
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Authorization is required' })
    }
    
    const token = authorization.replace('Bearer', '').trim()
    
    try{
        const { secret } = authConfig.jwt
        const data = jwt.verify(token, secret!) as TokenPayload
        
        req.userId = data.user.id

        return next()
    }catch{
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' })
    }
}
