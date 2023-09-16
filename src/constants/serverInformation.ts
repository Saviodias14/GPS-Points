export const port = +process.env.PORT || 5000;
export const serverHost = 'localhost';
export const serverPort = +process.env.TCP_PORT || 4000;
type LastMessage = [
    { id?: string, message?: string }?
];
const id = '0AF456'
const message = 'oi'
export let lastMessage: LastMessage = []
