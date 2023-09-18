import * as locationRepository from '../repository/location'
import { createInfo } from '../middleware/createInfo'

export function getLocation(device_id: string, userId: number) {
    const message = locationRepository.findDeviceId(device_id)
    const userDevice = locationRepository.findDeviceIdByUserId(userId)
    if (userDevice !== device_id) throw new Error('Unauthorized')
    if (!message) throw new Error('Device not found')
    const header = message?.slice(0, 4)
    const footer = message?.slice(-4)
    if (header !== '50F7' || footer !== '73C4') throw new Error('This message is not valid')

    const location = createInfo(message, device_id)
    return { location, message }
}