import net from 'net'
import readLine from 'readline'
import { serverHost, serverPort } from './constants/serverInformation'
import { createHex } from './constants/genarateHexadecimal'


const client = new net.Socket()

client.connect(serverPort, serverHost, () => {
    console.log('Se conectou')
    setInterval(() => {
        client.write(createHex())
    }, 5000);

})



