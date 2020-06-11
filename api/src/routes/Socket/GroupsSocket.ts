import RoomController from "@controllers/RoomController";
import GroupsController from "@controllers/GroupsController";

export default class GroupsSocket {
    socket: any
    ioSocket: any

    constructor(io: any, socket: any) {
        this.ioSocket = io
        this.socket = socket
    }


    public run() {
        this.socket.on('group_subscribe', (room:string='commonChat') => new GroupsController().commonInit(room, this.socket));
        //this.socket.on('group_common', () => new GroupsController().commonInit(this.socket))

        //
        this.socket.on("group", (room: Object | any ) => new GroupsController().groupInit(room, this.socket))
        this.socket.on("group_check_req", (friend_id: Object | any ) => new GroupsController().roomCheckByMembers(friend_id, this.socket))
        this.socket.on('group_send', (isRoom: any, message: any) =>  new GroupsController().newMessage(isRoom, message, this.socket))

        //
        this.socket.on('group_create', (isRoom: any) =>  new GroupsController().create(isRoom, this.socket).catch(err => console.log('error GroupsController', err)))
    }
}
