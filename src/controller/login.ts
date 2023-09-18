import { createJwt } from "@/service/login";
import e, { Request, Response } from "express";
import httpStatus from "http-status";

export async function createToken(req: Request, res: Response) {
    const { email, password } = req.body
    try {
        const token = await createJwt(email, password)
        return res.status(httpStatus.OK).send(token)
    } catch (err) {
        if (err.message === 'Email or password invalid') return res.sendStatus(httpStatus.UNAUTHORIZED)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}