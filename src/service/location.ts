import * as locationRepository from '@/repository/location'
import { createInfo } from '@/middleware/createInfo'

export async function getLocation(device_id: string, userId: number) {
    const message = await locationRepository.getLocationByDeviceId(device_id)
    const hex_location = message?.hex_location
    const userDevice = await locationRepository.getDeviceIdByUserId(userId)
    if (userDevice.device_id !== device_id) throw new Error('Unauthorized')
    if (!hex_location) throw new Error('Device not found')
    const header = hex_location?.slice(0, 4)
    const footer = hex_location?.slice(-4)
    if (header !== '50F7' || footer !== '73C4') throw new Error('This message is not valid')

    const location = createInfo(hex_location, device_id)
    return { location }
}