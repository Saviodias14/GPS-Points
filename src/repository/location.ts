import { usersList } from "@/constants/users";
import { lastMessage } from "../constants/serverInformation";


export function findDeviceId(device_id: string) {
    for (let i = 0; i < lastMessage.length; i++) {
        if (lastMessage[i].id === device_id) return lastMessage[i]
    }
    return undefined
}

export function findDeviceIdByUserId(userId: number) {
    for (let i = 0; i < usersList.length; i++) {
        if (usersList[i].id === userId) return usersList[i].device_id
    }
}