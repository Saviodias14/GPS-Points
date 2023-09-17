import { authValidation } from "@/middleware/authentication";
import { createToken, getLocation } from "@/controller/location";
import { Router } from "express";

const locationRouter = Router()

locationRouter.get('/location/:device_id', authValidation, getLocation)
locationRouter.get('/location', createToken)

export default locationRouter