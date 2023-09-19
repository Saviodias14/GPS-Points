import { authValidation } from "@/middleware/authentication.middleware";
import { getLocation } from "@/controller/location.controller";
import { Router } from "express";

const locationRouter = Router()

locationRouter.get('/:device_id', authValidation, getLocation)

export default locationRouter