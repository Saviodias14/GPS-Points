import net from 'net'
import readLine from 'readline'
import { serverHost, serverPort } from './constants/serverInformation'
import { createHex } from './constants/genarateHexadecimal'
import { idList } from './constants/idList'


const client = new net.Socket()

client.connect(serverPort, serverHost, () => {
    console.log('Se conectou')
    setInterval(async () => {
        for (let i = 0; i < idList.length; i++) {
            const message = createHex(idList[i])
            client.write(message)
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }, 15000);

})



