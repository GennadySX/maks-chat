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
        this.socket.on("room_check_req", (friend_id: Object | any ) => new RoomController().roomCheckByMembers(friend_id, this.socket))
        this.socket.on('send', (message: any, isRoom: any) =>  {
            console.log('room get is ',isRoom)
            new RoomController().newMessage(isRoom, message, this.socket)
        })

        this.socket.on('room_create', (isRoom: any) =>  {
            console.log('room create is ',isRoom)
                new RoomController().room_create(isRoom, this.socket)
        })


    }


}
