import net from 'net'
import { serverHost, serverPort } from './constants/serverInformation'
import { createHex } from './constants/generationTests/genarateHexadecimal'
import { usersList } from './constants/generationTests/users'
import { footer, header } from './constants/headerAndFooter'
import { createPing } from './constants/generationTests/generatePing'

const client = new net.Socket()

client.connect(serverPort, serverHost, () => {
    console.log('Se conectou')
    setInterval(async () => {
        for (let i = 0; i < usersList.length; i++) {
            const ping = createPing(usersList[i].device_id, header, footer)
            client.write(ping)
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }, 1000)

    setInterval(async () => {
        for (let i = 0; i < usersList.length; i++) {
            const message = createHex(usersList[i].device_id, header, footer)
            client.write(message)
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }, (500 * usersList.length));

})
