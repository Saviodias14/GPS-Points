import { prisma } from "@/database";

export async function cleanDb() {
    await prisma.user.deleteMany()
    await prisma.location.deleteMany()
}