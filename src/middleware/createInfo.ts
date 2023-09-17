import { Location } from "../protocols"
import { valuesCompositionArray } from "./valuesComposition"

function tranformToDecimal(message: string, start: number, end: number) {
    return parseInt(message.slice(start, end), 16)
}
export function createInfo(message: string, device_id: string) {
    const location: Location = {}

    location.device_id = device_id

    location.date = tranformToDecimal(message, 12, 20)

    location.direction = tranformToDecimal(message, 20, 24) / 100

    location.distance = tranformToDecimal(message, 24, 32)

    location.time = tranformToDecimal(message, 32, 40)

    const valuesComposition = tranformToDecimal(message, 40, 44).toString(2)
    location.valuesComposition = valuesCompositionArray(valuesComposition.slice(0, 5))

    location.speed = tranformToDecimal(message, 44, 46);

    if (location.valuesComposition[3] === 'Latitude negativa') {
        location.latitude = -tranformToDecimal(message, 46, 54) / 1000000
    } else {
        location.latitude = tranformToDecimal(message, 46, 54) / 1000000
    }


    if (location.valuesComposition[4] === 'Longitude negativa') {
        location.longitude = -tranformToDecimal(message, 54, 62) / 1000000
    } else {
        location.longitude = tranformToDecimal(message, 54, 62) / 1000000
    }

    return location
}