import { prisma } from "@/database";


export async function getLocationByDeviceId(device_id: string) {
    return await prisma.user.findFirst({
        where: { device_id },
        select: { hex_location: true }
    })
}

export async function getDeviceIdByUserId(userId: number) {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: { device_id: true }
    })
}