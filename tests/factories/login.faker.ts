import { User } from ".prisma/client"
import { faker } from "@faker-js/faker"
import bcrypt from 'bcrypt'

export const fakeEmail = faker.internet.email()
export const fakePassword = faker.internet.password()
export async function fakeUserData(): Promise<User> {
    return {
        id: faker.number.int(),
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), 10),
        device_id: faker.number.hex().padStart(8, '0'),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent()
    }
}