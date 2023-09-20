import app, { init } from "./app";
import net from 'net'
import { port, serverHost, serverPort } from "./constants/serverInformation";
import * as serverService from '@/service/server.service'

init().then(() => {
    app.listen(port, () => {
        console.log(`Web server is up and listening on port ${port}.`);
    });
})
const server = net.createServer((socket) => {
    console.log("Tracker conected")
    socket.on('data', async (bufferData) => {
        const data = bufferData.toString()
        const comandType = data.slice(10, 12)
        try {
            if (comandType === '02') {
                await serverService.clientDataStorage(data)
            } else if (comandType === '01') {
                const pingACK = 'I am alive!'
                socket.write(pingACK)
            }
        } catch (err) {
            if(err.name==='BadRequest'){
                socket.write('Error: ' + err.message);
            }
        }
    })
})
server.listen(serverPort, serverHost, () => {
    console.log('Server TCP conected')
});
