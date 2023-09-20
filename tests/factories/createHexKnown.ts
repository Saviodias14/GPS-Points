import { valuesForFalse, valuesForTrue } from "@/constants/valuesBinaryList";
import { Decimal } from "@prisma/client/runtime/library";

export function createHexKnown(id: number, device_id: string, date: number, direction: Decimal, distance: number,
    time: number, valuesComposition: string, speed: Decimal, latitude: Decimal, longitude: Decimal) {

    const result = {
        id,
        device_id,
        date,
        direction: new Decimal(parseFloat(direction.toFixed(2))),
        distance, time,
        valuesComposition: [
            parseInt(valuesComposition[0]) ? valuesForTrue[0] : valuesForFalse[0],
            parseInt(valuesComposition[1]) ? valuesForTrue[1] : valuesForFalse[1],
            parseInt(valuesComposition[2]) ? valuesForTrue[2] : valuesForFalse[2],
            parseInt(valuesComposition[3]) ? valuesForTrue[3] : valuesForFalse[3],
            parseInt(valuesComposition[4]) ? valuesForTrue[4] : valuesForFalse[4]
        ],
        speed: new Decimal(speed),
        latitude: new Decimal(latitude),
        longitude: new Decimal(longitude)
    }

    return result
}