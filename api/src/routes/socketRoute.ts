import RoomsSocket from "./Socket/RoomsSocket";
import * as io from 'socket.io'
import {SocketMiddleware} from "@config/SocketMiddleware";
import UploaderSocket from "./Socket/UploaderSocket";
import UsersSocket from "./Socket/UsersSocket";
import GroupsSocket from "./Socket/GroupsSocket";

export default class SocketRoute {
    ioSocket: any;

    constructor(app: any) {
        this.ioSocket = io.listen(app)
    }

    public run() {
        this.ioSocket.use(SocketMiddleware).on('connection', (socket: any) => {
            //Так и можешь вызвать но используй константы emit-ов
            new UsersSocket(this.ioSocket, socket).run()
            
            new RoomsSocket(this.ioSocket, socket).run()
            new GroupsSocket(this.ioSocket, socket).run()

            new UploaderSocket(this.ioSocket, socket).run()
        });

        //when user disconnected from NET
        this.ioSocket.on("disconnection", (socketUser: any) => {

        })
    }
}
