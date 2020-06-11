import {createSchema, Type} from "ts-mongoose";
import {RoomConst} from "@const/Model/RoomConst";
import {GroupConst} from "@const/Model/GroupConst";

const Members = createSchema(
    {
        user: Type.objectId({ required: true, unique: true }),
        joined: Type.date({default: new Date() as any}),
        invitedBy: Type.objectId({required: false}),
    },
    { _id: false, timestamps: true }
);

const Chat = createSchema(
    {
        type: Type.string({ required: true, enum: RoomConst.chat.type as any, default: RoomConst.chat.type[0]}),
        sender_id: Type.objectId({required: true}),
        to: Type.objectId({required: false} ),
        text: Type.string({required: true}),
    },
    { _id: true, timestamps: true }
);

const Admins = createSchema({
        user: Type.objectId({ required: true }),
        invitedBy: Type.objectId({ required: true }),
    },{_id: false, timestamps: true}
);

const GroupSchema = createSchema(
    {
        name: Type.string({ required: false, unique: true }),
        avatar: Type.string({ required: false }),
        type: Type.string({ required: false, enum: GroupConst.type, default: GroupConst.type[0] }),
        messageList: [Type.schema({ required: false }).of(Chat)],
        members: [Type.objectId({ required: true })],
        memberInfo: [Type.schema({required: false}).of(Members)],
        admins: [Type.schema({ required: false }).of(Admins)],
        owner: Type.objectId({ required: false }),
    },
    { timestamps: { createdAt: true, updatedAt: true } }
);



export  {
    GroupSchema
}

