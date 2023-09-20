import * as locationRepository from '@/repository/location.repository'

export async function getLocation(device_id: string, userId: number) {
    const deviceIformation = await locationRepository.getLocationByDeviceId(device_id)
    const userDeviceId = await locationRepository.getDeviceIdByUserId(userId)
    if (!deviceIformation) throw new Error('Device not found')
    console.log(userDeviceId, device_id)
    if (userDeviceId !== device_id) throw new Error('Unauthorized')

    return deviceIformation
}