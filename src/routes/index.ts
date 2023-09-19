import { Router } from "express";
import locationRouter from "./location.router";
import loginRouter from "./login.router";


const router = Router()

router
    .use('/api/v1/location', locationRouter)
    .use('/api/v1/login', loginRouter)

export default router