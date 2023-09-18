import app, { init } from "./app";
import net from 'net'
import { lastMessage, port, serverHost, serverPort } from "./constants/serverInformation";
import { usersList } from "./constants/users";
import { prisma } from "./database";

init().then(() => {
    app.listen(port, () => {
        console.log(`Web server is up and listening on port ${port}.`);
    });
})
const server = net.createServer((socket) => {
    console.log("Tracker conected")
    socket.on('data', async (data) => {
        let existIdObject = false
        const message = data.toString()
        const id = message.slice(4, 10)
        for (let i = 0; i < usersList.length; i++) {
            await prisma.user.updateMany({
                data: { hex_location: message }, where: { device_id: id }
            })
        }
    })
})
server.listen(serverPort, serverHost, () => {
    console.log('Server TCP conected')
});
