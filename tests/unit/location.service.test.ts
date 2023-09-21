import { faker } from '@faker-js/faker'
import { getLocation } from '@/service/location.service'
import { repositoryFunctionsResponse } from '../mocks/repositoryFunctions'
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
})