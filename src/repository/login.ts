import { prisma } from "@/database";


export async function getUser(email: string) {
    return await prisma.user.findUnique({
        where: { email }
    })
}