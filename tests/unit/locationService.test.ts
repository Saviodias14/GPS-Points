import { faker } from '@faker-js/faker'
import { getLocation } from '../../src/service/location'
import { createHex } from '../../src/constants/genarateHexadecimal'
import { createHexKnown } from '../factories/createHexKnown'
import { repositoryFunctionsResponse } from '../factories/repositoryFunctions'

describe('Location data processing tests', () => {

    const fakeDeviceId = faker.number.hex().padStart(8, '0')
    const fakeUserId = faker.number.int()
    it('Should not pass if user is not the owner', () => {
        const userDevice = faker.number.hex().padStart(8, '0')
        const hexMessage = createHex(fakeDeviceId, '50F7', '73C4')

        repositoryFunctionsResponse(userDevice, hexMessage)
        const result = () => getLocation(fakeDeviceId, fakeUserId)
        expect(result).toThrowError('Unauthorized');
    })

    it('Should not pass if the device_id not exist', () => {
        repositoryFunctionsResponse(fakeDeviceId, undefined)
        const result = () => getLocation(fakeDeviceId, fakeUserId)
        expect(result).toThrowError('Device not found');
    })

    it('Should not pass if header or footer are wrong', () => {
        const hexMessage = createHex(fakeDeviceId, '0000', '0000')

        repositoryFunctionsResponse(fakeDeviceId, hexMessage)
        const result = () => getLocation(fakeDeviceId, fakeUserId)
        expect(result).toThrowError('This message is not valid');
    })

    it('Should return the message decrypted', () => {
        const userId = 1
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

        repositoryFunctionsResponse(device_id, hexMessage.message)
        const result = getLocation(device_id, userId)
        console.log(result)
        console.log(JSON.stringify(hexMessage))
        expect(result).toEqual(hexMessage);
    })

})