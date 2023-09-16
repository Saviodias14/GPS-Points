import { getLocation } from "../controller/location";
import { Router } from "express";

const locationRouter = Router()

locationRouter.get('/location/:device_id', getLocation)

export default locationRouter