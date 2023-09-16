export const port = +process.env.PORT || 5000;
export const serverHost = 'localhost';
export const serverPort = +process.env.TCP_PORT || 4000;
type LastMessage = {
    message?: string
}
export const lastMessage: LastMessage = {}