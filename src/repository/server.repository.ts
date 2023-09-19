import { prisma } from "@/database";

export async function clientDataStorage(hex_location: string, device_id: string) {
    await prisma.user.updateMany({
        data: { hex_location }, where: { device_id }
    })
}