import * as locationRepository from '@/repository/location.repository'
import { createInfo } from '@/middleware/createInfo.middleware'
import { footer, header } from '@/constants/headerAndFooter'

export async function getLocation(device_id: string, userId: number) {
    const message = await locationRepository.getLocationByDeviceId(device_id)
    const hex_location = message?.hex_location
    const userDevice = await locationRepository.getDeviceIdByUserId(userId)
    if (userDevice.device_id !== device_id) throw new Error('Unauthorized')
    if (!hex_location) throw new Error('Device not found')
    const headerFromMessage = hex_location?.slice(0, 4)
    const footerFromMessage = hex_location?.slice(-4)
    if (header !== headerFromMessage || footer !== footerFromMessage) throw new Error('This message is not valid')

    const location = createInfo(hex_location, device_id)
    return { location }
}