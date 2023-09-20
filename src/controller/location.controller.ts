import { Request, Response } from "express";
import httpStatus from "http-status";
import * as serviceLocation from '@/service/location.service'


export async function getLocation(req: Request, res: Response) {
    const { device_id } = req.params
    const userId = parseInt(res.locals.userId)
    try {
        const result = await serviceLocation.getLocation(device_id, userId)
        return res.status(httpStatus.OK).send(result)
    } catch (err) {
        if (err.name === 'NotFound') return res.sendStatus(err.status)
        if (err.name === 'Unauthorized') return res.sendStatus(err.status)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}