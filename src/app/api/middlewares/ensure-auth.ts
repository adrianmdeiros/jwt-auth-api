import jwt from 'jsonwebtoken'
import authConfig from "../../config/auth";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

interface TokenPayload {
    id: string
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
        const data = jwt.verify(token, secret!)
        
        const { id } = data as TokenPayload
        
        req.userId = id

        return next()
    }catch{
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' })
    }
}