import { authValidation } from "@/middleware/authentication";
import { getLocation } from "@/controller/location";
import { Router } from "express";

const locationRouter = Router()

locationRouter.get('/:device_id', authValidation, getLocation)

export default locationRouter