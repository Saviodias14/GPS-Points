import { prisma } from "@/database";
import { Location } from "@/protocols";

export async function clientDataStorage(location: Location) {
    if (location.device_id) {
        await prisma.location.update({
            where: { device_id: location.device_id }, data: location
        })
    }
}