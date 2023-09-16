import { Request, Response } from "express";
import httpStatus from "http-status";
import * as serviceLocation from '../service/location'


export function getLocation(req: Request, res: Response) {
    const { device_id } = req.params
    try {
        const result = serviceLocation.getLocation(device_id)
        res.status(httpStatus.OK).send(result)
    } catch (err) {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}