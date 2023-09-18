import { jest } from '@jest/globals'
import * as locationRepository from '../../src/repository/location'
export function repositoryFunctionsResponse(deviceIdByUserIdResponse: string,
    deviceIdResponse: string | undefined) {
    jest.spyOn(locationRepository, 'findDeviceId').mockImplementationOnce((): any => {
        return deviceIdResponse
    })
    jest.spyOn(locationRepository, 'findDeviceIdByUserId').mockImplementationOnce((): any => {
        return deviceIdByUserIdResponse
    })
}