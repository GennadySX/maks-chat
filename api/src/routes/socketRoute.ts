import ChatSocket from "./Socket/ChatSocket";
import ZakSocket from "./Socket/ZakSocket";
import { Emits } from '@const/SocketEmit/Emits';

export default class SocketRoute {
    io: any;
    constructor(props: any) {
        this.io = props
    }



    public run = (io: any, client = null) => {
        io.on(Emits.connection, (socket: any) => {
            //Так и можешь вызвать но используй константы emit-ов
            new ZakSocket(io, socket).run()

            socket.on(Emits.chat, (msg: any) => new ChatSocket(socket, msg).chat)
        })
    }
}
