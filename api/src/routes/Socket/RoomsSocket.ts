import RoomController from "@controllers/RoomController";
import GroupsController from "@controllers/GroupsController";

export default class RoomsSocket {
    socket: any
    ioSocket: any

    constructor(io: any, socket: any) {
        this.ioSocket = io
        this.socket = socket
    }


    public run() {
        this.socket.on('room_send', (room: any, message: any) => {
            //console.log('message room is ', room)
            new RoomController().newMessage(room, message, this.socket)
        });
        //
        this.socket.on("room_check_req", (friend_id: Object | any ) => new RoomController().roomCheckByMembers(friend_id, this.socket))

    }




}
