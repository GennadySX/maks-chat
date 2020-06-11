import {createSchema, Type} from "ts-mongoose";
import {RoomConst} from "@const/Model/RoomConst";


const Chat = createSchema(
    {
        type: Type.string({required: true, enum: RoomConst.chat.type as any, default: RoomConst.chat.type[0]}),
        sender_id: Type.objectId({required: true}),
        receiver_id: Type.objectId({required: false}),
        text: Type.string({required: true}),
    },
    {_id: true, timestamps: true}
);


const RoomSchema = createSchema(
    {
        messageList: [Type.schema({required: true}).of(Chat)],
        members: [Type.objectId({required: true})],
    },
    {timestamps: {createdAt: true, updatedAt: true}}
);


export {
    RoomSchema
}

