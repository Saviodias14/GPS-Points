import { createHex } from "../../src/constants/genarateHexadecimal";
import { valuesForFalse, valuesForTrue } from "../../src/constants/valuesBinaryList";

export function createHexKnown(device_id: string, date: number, direction: number, distance: number,
    time: number, valuesComposition: string, speed: number, latitude: number, longitude: number) {

    const message = createHex(device_id, '50F7', '73C4', date, direction * 100, distance, time,
        valuesComposition, speed, Math.abs(latitude) * 1000000, Math.abs(longitude) * 1000000)

    const result = {
        location: {
            device_id,
            date,
            direction: parseFloat(direction.toFixed(2)),
            distance, time,
            valuesComposition: [
                parseInt(valuesComposition[0]) ? valuesForTrue[0] : valuesForFalse[0],
                parseInt(valuesComposition[1]) ? valuesForTrue[1] : valuesForFalse[1],
                parseInt(valuesComposition[2]) ? valuesForTrue[2] : valuesForFalse[2],
                parseInt(valuesComposition[3]) ? valuesForTrue[3] : valuesForFalse[3],
                parseInt(valuesComposition[4]) ? valuesForTrue[4] : valuesForFalse[4]
            ],
            speed,
            latitude,
            longitude
        },
        hex_location: message
    }

    return result
}