import * as locationRepository from '../repository/location'
import { Location } from '@/protocols/index'

export function getLocation(device_id: string) {
    const message = locationRepository.findDeviceId(device_id)
    if (!message) throw new Error('Device not found')
    const header = message.slice(0, 4)
    const footer = message.slice(-4)
    if (header !== '50F7' || footer !== '73C4') throw new Error('This message is not valid')

    const location: Location = {}
    location.device_id = device_id

    location.date = parseInt(message.slice(12, 20), 16)

    location.direction = parseInt(message.slice(20, 24), 16) / 100

    location.distance = parseInt(message.slice(24, 32), 16)

    location.time = parseInt(message.slice(32, 40), 16)

    location.ValuesComposition = parseInt(message.slice(40, 44),16).toString(2)

    location.speed = parseInt(message.slice(44, 46), 16)

    location.latitude = parseInt(message.slice(46, 54), 16) / 1000000

    location.longitude = parseInt(message.slice(54, 62), 16) / 1000000

    return { location, message }
}