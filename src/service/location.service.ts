import { notFoundError } from '@/errors/notFound.error'
import { unauthorizedError } from '@/errors/unauthorized.error'
import * as locationRepository from '@/repository/location.repository'

export async function getLocation(device_id: string, userId: number) {
    const deviceIformation = await locationRepository.getLocationByDeviceId(device_id)
    const userDeviceId = await locationRepository.getDeviceIdByUserId(userId)
    if (!deviceIformation) throw notFoundError('Device not found')
    if (userDeviceId !== device_id) throw unauthorizedError('You can not access this')

    return deviceIformation
}