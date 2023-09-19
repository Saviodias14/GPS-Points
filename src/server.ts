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
    socket.on('data', async (data) => {
        await serverService.clientDataStorage(data.toString())
    })
})
server.listen(serverPort, serverHost, () => {
    console.log('Server TCP conected')
});
