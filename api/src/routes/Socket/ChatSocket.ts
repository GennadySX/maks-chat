import RoomController from "@controllers/RoomController";
import UserController from "@controllers/UserController";

export default class ChatSocket {
    socket: any
    ioSocket: any

    constructor(io: any, socket: any) {
        this.ioSocket = io
        this.socket = socket
    }


    public run() {

        this.socket.on('subscribe', (room:any) => new RoomController().commonInit(room, this.socket));
        this.socket.on('room_send', (room: any, message: any) => new RoomController().newMessage(room, message, this.socket));
        this.socket.on("room", (room: Object | any ) => new RoomController().roomInit(room, this.socket))

    }


}
