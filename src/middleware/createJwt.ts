import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export function createJwt(email:string, id:number){
    const token = jwt.sign({email, id}, process.env.SECRET_KEY,{subject:id.toString()})
    console.log(token)
    return token
}