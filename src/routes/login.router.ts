import { createToken } from "@/controller/login.controler";
import { Router } from "express";


const loginRouter = Router()

loginRouter.post('/', createToken)

export default loginRouter