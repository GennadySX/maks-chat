/**
 * Created by GennadySX on @2020
 */
import Controller from "@controllers/Controller";
import Room from "@models/Room";
import {SocketEmits} from "@const/Socket/SocketEmits";
import {RoomConst} from "@const/Model/RoomConst";

export default class RoomController extends Controller {
    constructor() {
        super(new Room());
    }


    //commonInit
    public commonInit(room: string, socket: any) {
        super.getOne({name: room}, (commonChat: object | any) => {
            if (commonChat && commonChat.data) {
                console.log('room is ', room)
                socket.join(room)
                socket.emit(SocketEmits.commonChatData, commonChat.data)
            } else {
                super.create({
                        name: room,
                        members: {user: socket.user_id},
                        chat: {
                            from: socket.user_id,
                            text: "Hey"
                        },
                        owner: socket.user_id
                    }, (created: any) =>
                        (created.data) ? console.log('common chat is ', created.data) : console.log('room not created by error ', created.error)
                )
            }
        })
    }

    public roomInit(room: string, socket: any) {
        super.getOne({name: room}, (roomChat: object | any) => {
            if (roomChat && roomChat.data) {
                console.log('room is ', room)
                socket.join(room)
                socket.emit(SocketEmits.commonChatData, roomChat.data)
            } else {
                super.create({
                        name: room,
                        type: RoomConst.type[1], // type as group for common chat
                        members: {user: socket.user_id},
                        chat: {
                            from: socket.user_id,
                            text: "Hey"
                        },
                        owner: socket.user_id
                    }, (created: any) =>
                        (created.data) ? console.log('common chat is ', created.data) : console.log('room not created by error ', created.error)
                )
            }
        })
    }


    newMessage(room: object | any, message: object | any, socket: any) {
        super.update(room, {"$push": {"messageList": message}}, (roomData: any) => {
            if (roomData.data) {
                super.getLast(room, 'messageList', (lastMessage: any) =>
                    socket.broadcast.emit("message", lastMessage && lastMessage.data ? lastMessage.data : null)
                )
            } else {
                console.log('Error  updated message list ', roomData.error)
            }
        })
    }


    public async roomCheckByMembers(friend_id: any, socket: any): Promise<void> {
        this.get({members: [{user: friend_id}, {user: socket.user_id}]}, (res:any) => {
            console.log('res is', res)
            socket.emit('room_check_res', res)
        })
    }

}