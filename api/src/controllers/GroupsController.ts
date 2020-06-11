/**
 * Created by GennadySX on @2020
 */
import Controller from "@controllers/Controller";
import Room from "@models/Room";
import {SocketEmits} from "@const/Socket/SocketEmits";
import {RoomConst} from "@const/Model/RoomConst";
import Groups from "@models/Groups";
import {GroupConst} from "@const/Model/GroupConst";
import {GroupSeeder} from "../database/seeds/GroupSeeder";

export default class GroupsController extends Controller {
    constructor() {
        super(new Groups());
    }

    //commonInit
    public commonInit(room: string, socket: any) {

        super.getOne({name: room}, (commonChat: object | any) => {
            //console.log('group find subscribe ', commonChat);
            if (commonChat && commonChat.data ) {
                console.log('subscribed', room)
                socket.join(room)
                socket.emit(SocketEmits.commonChatData, commonChat.data)
            } else GroupSeeder(socket);
        })
    }

    public groupInit(room: string, socket: any) {
        super.getOne({name: room}, (roomChat: object | any) => {
            console.log('room is ', room)
            if (roomChat && roomChat.data) {
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


    newMessage(room:  any, message:  any, socket: any) {
        console.log('get new message', message)
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

        new Room().find({members: { "$in" :  [ friend_id, socket.user_id]}, type: 'user'}, (err: Error, data: any) => {
            console.log('res is', data)
            socket.emit('room_check_res', data, err)
        })

        // this.get({members: [{user: friend_id}, {user: socket.user_id}]}, (res:any) => {
        //
        // })
    }



    public async create(member: any, socket: any): Promise<void> {
       await super.create({
            members: [socket.user_id, member.user],
            owner: socket.user_id}, (res:any) => {
            console.log('room created', res)
            socket.emit('room_created', res)
        })
    }

}