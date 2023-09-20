import { faker } from "@faker-js/faker"
function fakeHex(min: number, max: number, length: number) {
    return faker.number.hex({ min, max }).padStart(length, '0')
}

function hex(value: number, length?: number) {
    return value.toString(16).padStart(length, '0')
}

function createGpsDate(fixedDate?: number) {
    const date = (new Date())
    const dateInSeconds = Math.floor((date).getTime() / 1000)
    const hexDate = (fixedDate ?? dateInSeconds).toString(16).padStart(8, '0')
    return hexDate
}

function createValuesComposition(fixedValuesComposition?: string) {
    const binary = (faker.number.binary({ min: 0, max: 31 })).toString() + '00000000000'
    const decimal = parseInt((fixedValuesComposition ?? binary), 2)
    const binaryToHex = decimal.toString(16).padStart(4, '0')
    return binaryToHex
}
export function createHex(device_id: string, header: string, footer: string,
    fixedDate?: number, fixedDirection?: number, fixedDistance?: number, fixedTime?: number,
    fixedValuesComposition?: string, fixedSpeed?: number,
    fixedLatitude?: number, fixedLongitude?: number) {

    const localizationType = '02'
    const gpsDate = createGpsDate(fixedDate)
    const direction = fixedDirection ? hex(fixedDirection, 4) : fakeHex(0, 35999, 4)
    const distance = fixedDistance ? hex(fixedDistance, 8) : fakeHex(0, 100000, 8)
    const time = fixedTime ? hex(fixedTime, 8) : fakeHex(0, 100000000, 8)
    const valuesComposition = createValuesComposition(fixedValuesComposition)
    const speed = fixedSpeed ? hex(fixedSpeed, 2) : fakeHex(0, 255, 2)
    const latitude = fixedLatitude ? hex(fixedLatitude, 8) : fakeHex(0, 90000000, 8)
    const longitude = fixedLongitude ? hex(fixedLongitude, 8) : fakeHex(0, 180000000, 8)
    const localizationMessage = (header + device_id + localizationType + gpsDate + direction
        + distance + time + valuesComposition + speed + latitude + longitude + footer)
    return localizationMessage.toUpperCase()
}