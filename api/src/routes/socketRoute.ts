import ChatSocket from "./Socket/ChatSocket";
import ZakSocket from "./Socket/ZakSocket";

export default class SocketRoute {
    io: any;
    constructor(props: any) {
        this.io = props
    }



    public run = (io: any, client = null) => {
        io.on('connection', (socket: any) => {
            //Так и можешь вызвать но используй константы emit-ов
            new ZakSocket(io, socket).run()

            socket.on('chat', (msg: any) => new ChatSocket(socket, msg).chat)
        })
    }
}
