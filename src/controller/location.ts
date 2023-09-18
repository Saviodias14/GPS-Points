import { Request, Response } from "express";
import httpStatus from "http-status";
import * as serviceLocation from '../service/location'
import { usersList } from "../constants/users";
import { createJwt } from "../middleware/createJwt";


export function getLocation(req: Request, res: Response) {
    const { device_id } = req.params
    const userId = parseInt(res.locals.userId)
    try {
        const result = serviceLocation.getLocation(device_id, userId)
        return res.status(httpStatus.OK).send(result)
    } catch (err) {
        if (err.message === 'Device not found') return res.sendStatus(httpStatus.NOT_FOUND)
        if (err.message === 'This message is not valid') return res.sendStatus(httpStatus.BAD_GATEWAY)
        if (err.message === 'Unauthorized') return res.sendStatus(httpStatus.UNAUTHORIZED)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export function createToken(req: Request, res: Response) {
    for (let i = 0; i < usersList.length; i++) {
        createJwt(usersList[i].email, usersList[i].id)
    }
}