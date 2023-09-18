import { PrismaClient } from "@prisma/client";
import { usersList } from '../src/constants/users'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()
async function main() {
    for(let i = 0; i<usersList.length; i++){
        const password = await bcrypt.hash(usersList[i].password, 10)
        usersList[i].password = password
    }
    await prisma.user.createMany({
        data: usersList
    })
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });