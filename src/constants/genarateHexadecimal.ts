import { faker } from "@faker-js/faker"
function fakeHex(min: number, max: number, length?: number) {
    if (length) {
        return faker.number.hex({ min, max }).padStart(length, '0')
    }
    return faker.number.hex({ min, max })
}

export function createHex() {
    const header = '50F7'
    const deviceId = '0A3F73'
    const localizationType = '02'
    const pingType = '01'
    const gpsDate = () => {
        const date = (new Date())
        const dateInSeconds = Math.floor(date.getTime() / 1000)
        const hexDate = dateInSeconds.toString(16).padStart(8, '0')
        return hexDate
    }
    const direction = fakeHex(0, 360, 4)
    const distance = fakeHex(0, 100000, 8)
    const time = fakeHex(0, 100000000, 8)
    const valuesComposition = () => {
        const binary = faker.number.binary({ min: 0, max: 32 }) + '00000000000'
        const binaryToHex = parseInt(binary).toString(16).padStart(4, '0')
        return binaryToHex
    }
    const speed = fakeHex(0, 16 ** 2, 2)
    const latitude = fakeHex(-90000000, 90000000, 8).replace('-', 'F')
    const longitude = fakeHex(-180000000, 180000000, 8).replace('-', 'F')
    const footer = '73C4'

    const localizationMessage = (header + deviceId + localizationType + gpsDate() +
        direction + distance + time + valuesComposition() +
        speed + latitude + longitude + footer)

    return localizationMessage.toUpperCase()
}