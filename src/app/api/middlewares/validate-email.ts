import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import validator from 'validator';

export const validateEmail = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if(!email || !validator.isEmail(email)){
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid email format.' })
    }

    next()
}