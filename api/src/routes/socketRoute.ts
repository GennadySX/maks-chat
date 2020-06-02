import ChatSocket from "./Socket/ChatSocket";
import * as io from 'socket.io'
import ProfileSocket from "./Socket/ProfileSocket";
import {SocketMiddleware} from "@config/SocketMiddleware";
import UploaderSocket from "./Socket/UploaderSocket";
import UsersSocket from "./Socket/UsersSocket";
export default class SocketRoute {
    ioSocket: any;
    constructor(app: any) {
        this.ioSocket = io.listen(app)
    }

    public run () {
        this.ioSocket.use(SocketMiddleware).on('connection', (socket: any) => {
            //Так и можешь вызвать но используй константы emit-ов
            new ProfileSocket(this.ioSocket, socket).run()
            new UsersSocket(this.ioSocket, socket).run()
            new ChatSocket(this.ioSocket, socket).run()
            new UploaderSocket(this.ioSocket, socket).run()



        })

        //when user disconnected from NET
        this.ioSocket.on("disconnection", (socketUser: any) => {

        })
    }
}
