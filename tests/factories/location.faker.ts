import { valuesForFalse, valuesForTrue } from "@/constants/valuesBinaryList"
import { faker } from "@faker-js/faker"
import { Decimal } from "@prisma/client/runtime/library"

export const fakeDeviceId = faker.number.hex().padStart(8, '0')
export const fakeUserId = faker.number.int()
export const fakeLocation = {
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