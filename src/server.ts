import app from "./app";
import net from 'net'
import { lastMessage, port, serverHost, serverPort } from "./constants/serverInformation";

app.listen(port, () => {
    console.log(`Web server is up and listening on port ${port}.`);
});
const server = net.createServer((socket) => {
    console.log("Tracker conected")
    socket.on('data', data => {
        let existIdObject = false
        const message = data.toString()
        const id = message.slice(4, 10)
        for (let i = 0; i < lastMessage.length; i++) {
            if (lastMessage[i].id === id) {
                existIdObject = true
                lastMessage[i].message = message
                break
            }
        }
        if (!existIdObject) {
            lastMessage.push({ id, message })
        }
    })
})
server.listen(serverPort, serverHost, () => {
    console.log('Server TCP conected')
});
