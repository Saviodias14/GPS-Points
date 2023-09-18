
import * as locationRepository from '../../src/repository/location'
import { jest } from '@jest/globals'
import { faker } from '@faker-js/faker'
import { getLocation } from '../../src/service/location'
import { createHex } from '../../src/constants/genarateHexadecimal'
import { createHexKnown } from '../factories/createHexKnown'

describe('Location data processing tests', () => {

    const fakeDeviceId = faker.number.hex().padStart(8, '0')
    it('Should not pass if the device_id not exist', () => {
        jest.spyOn(locationRepository, 'findDeviceId').mockImplementationOnce((): any => {
            return undefined
        })
        const result = () => getLocation(fakeDeviceId)
        expect(result).toThrowError('Device not found');
    })
    it('Should not pass if header or footer are wrong', () => {
        const hexMessage = createHex(fakeDeviceId, '0000', '0000')

        jest.spyOn(locationRepository, 'findDeviceId').mockImplementationOnce((): any => {
            return hexMessage
        })
        const result = () => getLocation(fakeDeviceId)
        expect(result).toThrowError('This message is not valid');
    })

    it('Should return the message decrypted', () => {
        const device_id = 'AAAAAA'
        const date = Math.floor(new Date().getTime() / 1000)
        const direction = 45.00
        const distance = 1500
        const time = 12345
        const valuesComposition = '10101' + '00000000000'
        const speed = 65
        const latitude = 87.654321
        const longitude = -123.654321

        const hexMessage = createHexKnown(device_id, date, direction, distance, time, valuesComposition,
            speed, latitude, longitude)

        jest.spyOn(locationRepository, 'findDeviceId').mockImplementationOnce((): any => {
            return hexMessage.message
        })
        const result = getLocation(device_id)
        console.log(result)
        console.log(JSON.stringify(hexMessage))
        expect(result).toEqual(hexMessage);
    })

})