import { NextFunction, Request, Response } from "express"
import { APIError } from "../helpers/APIError"
import { StatusCodes } from "http-status-codes"

export const errorHandler = (err: APIError, req: Request, res: Response, next: NextFunction) => {
    return err ?
        res.status(err.statusCode).json(err.name)
        :
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
}
