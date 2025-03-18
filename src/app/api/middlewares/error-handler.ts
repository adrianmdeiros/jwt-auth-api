import { NextFunction, Request, Response } from "express"
import { APIError } from "../helpers/APIError"
import { StatusCodes } from "http-status-codes"

export const errorHandler = (err: Partial<APIError>, req: Request, res: Response, next: NextFunction) => {
    return err instanceof APIError ?
        res.status(err.statusCode).json({ name: err.name, message: err.message })
        :
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ name: err.name, message: 'Internal Server Error' });
}
