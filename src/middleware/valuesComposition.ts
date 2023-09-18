import { valuesForFalse, valuesForTrue } from "@/constants/valuesBinaryList"

export function valuesCompositionArray(value: string){
    const valuesArray = []
    for(let i = 0; i<value.length;i++){
        if(parseInt(value[i])===0){
            valuesArray.push(valuesForFalse[i])
        }else{
            valuesArray.push(valuesForTrue[i])
        }
    }
    return valuesArray
}