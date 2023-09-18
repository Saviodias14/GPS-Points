import { lastMessage } from "../constants/serverInformation";


export function findDeviceId(device_id: string) {
    for (let i = 0; i < lastMessage.length; i++) {
        if (lastMessage[i].id === device_id) return lastMessage[i].message
    }
    return undefined
}