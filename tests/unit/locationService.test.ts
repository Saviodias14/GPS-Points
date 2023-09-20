import { faker } from '@faker-js/faker'
import { getLocation } from '@/service/location.service'
import { createHex } from '@/constants/genarateHexadecimal'
import { createHexKnown } from '../factories/createHexKnown'
import { repositoryFunctionsResponse } from '../factories/repositoryFunctions'
import { valuesForFalse, valuesForTrue } from '@/constants/valuesBinaryList'
import { Runtime } from 'inspector'
import { Decimal } from '@prisma/client/runtime/library'

describe('Location data processing tests', () => {

    const fakeDeviceId = faker.number.hex().padStart(8, '0')
    const fakeUserId = faker.number.int()
    const fakeLocation = {
        id: faker.number.int(),
        device_id: faker.number.hex({ min: 0, max: (16 ** 6) - 1 }),
        date: (new Date()).getTime() / 1000,
        direction: new Decimal(faker.number.float({ min: 0, max: 359.99 })),
        distance: faker.number.int({ min: 0, max: 100000 }),
        time: faker.number.int({ min: 0, max: 100000000 }),
        valuesComposition: [
            valuesForFalse[0],
            valuesForTrue[1],
            valuesForTrue[2],
            valuesForFalse[3],
            valuesForFalse[4]],
        speed: new Decimal(faker.number.float({ min: 0, max: 255 })),
        latitude: new Decimal(faker.number.float({ min: 0, max: 90000000 }) / 1000000),
        longitude: new Decimal(faker.number.float({ min: 0, max: 180000000 }) / 1000000)
    }
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
            expect(err.message).toEqual('Unauthorized');
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