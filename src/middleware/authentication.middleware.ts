import { unauthorizedError } from "@/errors/unauthorized.error";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export function authValidation(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw unauthorizedError('Unauthorized');
        }


        const data = jwt.verify(token, process.env.SECRET_KEY);
        res.locals.userId = data.sub
        next();
    } catch (err) {
        res.status(err.status).send(err.message);
    }
};