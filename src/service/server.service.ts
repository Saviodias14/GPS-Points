import { createInfo } from "@/middleware/createInfo.middleware"
import * as serverRepository from "@/repository/server.repository"

export async function clientDataStorage(data: string) {
    const location = createInfo(data)

    await serverRepository.clientDataStorage(location)
    console.log({ location, data }, data.length)
}