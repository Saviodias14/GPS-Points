import { usersList } from "@/constants/users"
import * as serverRepository from "@/repository/server.repository"

export async function clientDataStorage(data: string) {
    const message = data
    const id = message.slice(4, 10)
    for (let i = 0; i < usersList.length; i++) {
        await serverRepository.clientDataStorage(message, id)
    }
}