import app from "./app";
import net from 'net'
import { lastMessage, port, serverHost, serverPort } from "./constants/serverInformation";

app.listen(port, () => {
    console.log(`Web server is up and listening on port ${port}.`);
});
const server = net.createServer((socket) => {
    console.log("Tracker conected")
    socket.on('data', data => {
        lastMessage.message = data.toString()
        console.log(lastMessage)
    })
})
server.listen(serverPort, serverHost, () => {
    console.log('Server TCP conected')
});
