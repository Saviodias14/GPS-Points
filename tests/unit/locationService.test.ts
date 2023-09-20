import { faker } from '@faker-js/faker'
import { getLocation } from '@/service/location.service'
import { createHexKnown } from '../factories/createHexKnown'
import { repositoryFunctionsResponse } from '../mocks/repositoryFunctions'
import { Decimal } from '@prisma/client/runtime/library'
import { fakeDeviceId, fakeLocation, fakeUserId } from '../factories/location.faker'

describe('Location data processing tests', () => {

    it('Should not pass if the device_id does not exist', async () => {
        repositoryFunctionsResponse(fakeDeviceId, undefined)

        try {
            await getLocation(fakeDeviceId, fakeUserId)
        } catch (err) {
            expect(err.message).toEqual('Device not found');
        }
    })

    it('Should not pass if user is not the owner', async () => {
        const userDevice = faker.number.hex().padStart(8, '0')

        repositoryFunctionsResponse(userDevice, fakeLocation)
        try {
            await getLocation(fakeDeviceId, fakeUserId)
        } catch (err) {
            expect(err.message).toEqual('You can not access this');
        }
    })

    it('Should return the message decrypted', async () => {
        const id = 1
        const userId = 1
        const device_id = 'AAAAAA'
        const date = Math.floor(new Date().getTime() / 1000)
        const direction = new Decimal(45.00)
        const distance = 1500
        const time = 12345
        const valuesComposition = '10101' + '00000000000'
        const speed = new Decimal(65)
        const latitude = new Decimal(87.654321)
        const longitude = new Decimal(-123.654321)

        const hexMessage = createHexKnown(id, device_id, date, direction, distance, time, valuesComposition,
            speed, latitude, longitude)

        repositoryFunctionsResponse(device_id, hexMessage)
        const result = await getLocation(device_id, userId)
        expect(result).toEqual(hexMessage);
    })

})