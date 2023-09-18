import { faker } from '@faker-js/faker'
import { getLocation } from '../../src/service/location'
import { createHex } from '../../src/constants/genarateHexadecimal'
import { createHexKnown } from '../factories/createHexKnown'
import { repositoryFunctionsResponse } from '../factories/repositoryFunctions'

describe('Location data processing tests', () => {

    const fakeDeviceId = faker.number.hex().padStart(8, '0')
    const fakeUserId = faker.number.int()
    it('Should not pass if user is not the owner', async () => {
        const userDevice = faker.number.hex().padStart(8, '0')
        const hexMessage = createHex(fakeDeviceId, '50F7', '73C4')

        repositoryFunctionsResponse({ device_id: userDevice }, { hex_location: hexMessage })
        try {
            await getLocation(fakeDeviceId, fakeUserId)
        } catch (err) {
            expect(err.message).toEqual('Unauthorized');
        }
    })

    it('Should not pass if the device_id does not exist', async () => {
        repositoryFunctionsResponse({ device_id: fakeDeviceId }, undefined)

        try {
            await getLocation(fakeDeviceId, fakeUserId)
        } catch (err) {
            expect(err.message).toEqual('Device not found');
        }
    })

    it('Should not pass if header or footer are wrong', async () => {
        const hexMessage = createHex(fakeDeviceId, '0000', '0000')

        repositoryFunctionsResponse({ device_id: fakeDeviceId }, { hex_location: hexMessage })
        try {
            await getLocation(fakeDeviceId, fakeUserId)
        } catch (err) {
            expect(err.message).toEqual('This message is not valid');
        }
    })

    it('Should return the message decrypted', async () => {
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

        repositoryFunctionsResponse({ device_id: device_id }, { hex_location: hexMessage.hex_location })
        const result = await getLocation(device_id, userId)
        expect(result).toEqual(hexMessage.location);
    })

})