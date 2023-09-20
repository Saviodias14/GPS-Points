import { prisma } from "@/database";


export async function getLocationByDeviceId(device_id: string) {
    return await prisma.location.findFirst({
        where: { device_id }
    })
}

export async function getDeviceIdByUserId(userId: number) {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    })
    return user?.device_id
}