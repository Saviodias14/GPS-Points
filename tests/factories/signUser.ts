import { prisma } from "@/database";
import { faker } from "@faker-js/faker";
import bcrypt from 'bcrypt'

export async function signUp() {
    const { device_id } = await createLocation()
    const password = await bcrypt.hash(faker.internet.password(), 10)
    return await prisma.user.create({
        data: { email: faker.internet.email(), password, device_id }
    })
}
export async function signUpUsers(usersNumber?: number) {
    const users = []
    for (let i = 0; i < usersNumber; i++) {
        const { device_id } = await createLocation()
        const password = await bcrypt.hash(faker.internet.password(), 10)
        users.push(await prisma.user.create({
            data: { email: faker.internet.email(), password, device_id }
        }))
    }
    return users
}
export async function createLocation() {
    return await prisma.location.create({
        data: { device_id: faker.number.hex().padStart(6, '0') },
        select: { device_id: true }
    })
}