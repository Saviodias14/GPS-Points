import jwt from 'jsonwebtoken'
import * as loginRepository from '@/repository/login.repository'
import bcrypt from 'bcrypt'
import { unauthorizedError } from '@/errors/unauthorized.error'

export async function createJwt(email: string, password: string) {
    const user = await loginRepository.getUser(email)
    if (!user) throw unauthorizedError('Email or password invalid')
    const verifyPassword = bcrypt.compare(password, user.password)
    if (!verifyPassword) throw unauthorizedError('Email or password invalid')
    const { id } = user
    const token = jwt.sign({ email, id }, process.env.SECRET_KEY, { subject: id.toString() })
    return { token }
}