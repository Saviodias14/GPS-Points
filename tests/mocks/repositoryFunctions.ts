import { jest } from '@jest/globals'
import * as locationRepository from '@/repository/location.repository'
import { Location } from '@prisma/client'
export function repositoryFunctionsResponse(deviceIdByUserIdResponse: string | undefined,
    locationByDeviceIdResponse: Location | undefined) {
    jest.spyOn(locationRepository, 'getLocationByDeviceId').mockResolvedValueOnce(locationByDeviceIdResponse)
    jest.spyOn(locationRepository, 'getDeviceIdByUserId').mockResolvedValueOnce(deviceIdByUserIdResponse)
}