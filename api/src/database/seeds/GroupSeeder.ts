import Groups from "@models/Groups";
import {SocketEmits} from "../../Constants/Socket/SocketEmits";


export const GroupSeeder = (socket: any, room: string = 'commonChat') => {
    new Groups().create({
        name: room,
        members: [socket.user_id],
        type: 'common',
    }, (err: Error, room_data: any) => {
        console.log('common chat created', room_data)
        socket.join(room)
        socket.emit(SocketEmits.commonChatData, room_data)
    })
}