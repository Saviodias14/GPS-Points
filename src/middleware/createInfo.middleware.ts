import { Location } from "@/protocols"
import { valuesCompositionArray } from "./valuesComposition.middleware"

function hexToDecimal(hexString: string, startIndex: number, endIndex: number) {
    return parseInt(hexString.slice(startIndex, endIndex), 16)
}
function parseLatitudeLongitude(hexString: string, startIndex: number, endIndex: number, negativeIndicator: string): number {
    const value = hexToDecimal(hexString, startIndex, endIndex) / 1000000;
    return negativeIndicator === '1' ? -1 * value : value;
}
export function createInfo(hexString: string) {
    const valuesCompositionBinary = (hexToDecimal(hexString, 40, 44)).toString(2).padEnd(16,'0').slice(0, 5)
    const location: Location = {
        device_id: hexString.slice(4, 10),
        date: hexToDecimal(hexString, 12, 20),
        direction: parseFloat((hexToDecimal(hexString, 20, 24) / 100).toFixed(2)),
        distance: hexToDecimal(hexString, 24, 32),
        time: hexToDecimal(hexString, 32, 40),
        valuesComposition: valuesCompositionArray(valuesCompositionBinary),
        speed: hexToDecimal(hexString, 44, 46),
        latitude: parseLatitudeLongitude(hexString, 46, 54, valuesCompositionBinary[3]),
        longitude: parseLatitudeLongitude(hexString, 54, 62, valuesCompositionBinary[4]),
    };

    return location
}