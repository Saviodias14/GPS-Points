import { footer, header } from "@/constants/headerAndFooter"
import { badRequestError } from "@/errors/badRequest.error"
import { createInfo } from "@/middleware/createInfo.middleware"
import * as serverRepository from "@/repository/server.repository"

export async function clientDataStorage(data: string) {
    const dataHeader = data.slice(0,4)
    const dataFooter = data.slice(-4)
    if(!data||dataFooter!==footer||dataHeader!==header) throw badRequestError('Location wrong or not exist')
    const location = createInfo(data)

    await serverRepository.clientDataStorage(location)
}