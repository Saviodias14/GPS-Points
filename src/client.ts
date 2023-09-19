import net from 'net'
import { serverHost, serverPort } from './constants/serverInformation'
import { createHex } from './constants/genarateHexadecimal'
import { usersList } from './constants/users'
import { footer, header } from './constants/headerAndFooter'


const client = new net.Socket()

client.connect(serverPort, serverHost, () => {
    console.log('Se conectou')
    setInterval(async () => {
        for (let i = 0; i < usersList.length; i++) {
            const message = createHex(usersList[i].device_id, header, footer)
            client.write(message)
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }, (200 * usersList.length));

})



