import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export function authValidation(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }


        const data = jwt.verify(token, process.env.SECRET_KEY);
        res.locals.userId = data.sub
        next();
    } catch (err) {
        console.log(err)
        res.status(401).send('Unauthorized');
    }
};