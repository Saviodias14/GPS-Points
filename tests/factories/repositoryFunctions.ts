import { jest } from '@jest/globals'
import * as locationRepository from '../../src/repository/location'
export function repositoryFunctionsResponse(deviceIdByUserIdResponse: { device_id: string },
    locationByDeviceIdResponse: { hex_location: string } | undefined) {
    jest.spyOn(locationRepository, 'getLocationByDeviceId').mockResolvedValueOnce(locationByDeviceIdResponse)
    jest.spyOn(locationRepository, 'getDeviceIdByUserId').mockResolvedValueOnce(deviceIdByUserIdResponse)
}