import { PrismaClient, User } from "@prisma/client";
import { usersList } from '../src/constants/users'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

async function createUsers() {
    const usersListWithHashedPasswords = await Promise.all(
        usersList.map(async (user) => ({
            ...user,
            password: await bcrypt.hash(user.password, 10),
        }))
    );

    return prisma.user.createMany({
        data: usersListWithHashedPasswords,
    });
}


async function createLocationDevices() {
    const devices = usersList.map((user) => ({
        device_id: user.device_id
    }));

    return prisma.location.createMany({ data: devices });
}

async function main() {
    await prisma.user.deleteMany()
    await prisma.location.deleteMany()

    await createLocationDevices();
    await createUsers();

    console.log('Registros criados com sucesso.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });