import {createSchema, Type} from "ts-mongoose";
import {RoomConst} from "@const/Model/RoomConst";

const Members = createSchema(
    {
        user: Type.objectId({ required: true }),
        joined: Type.date({default: new Date() as any}),
        invitedBy: Type.objectId({required: false}),
    },
    { _id: false, timestamps: true }
);

const Chat = createSchema(
    {
        type: Type.string({ required: true, enum: RoomConst.chat.type as any, default: RoomConst.chat.type[0]}),
        from: Type.objectId({required: true}),
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

const RoomSchema = createSchema(
    {
        name: Type.string({ required: false, unique: true }),
        avatar: Type.string({ required: false }),
        type: Type.string({ required: true, enum: RoomConst.type, default: RoomConst.type[0] }),
        messageList: [Type.schema({ required: true }).of(Chat)],
        members: [
            Type.schema({ required: true }).of(Members)
        ],
        admins: [Type.schema({ required: false }).of(Admins)],
        owner: Type.objectId({ required: true }),
    },
    { timestamps: { createdAt: true, updatedAt: true } }
);



export  {
    RoomSchema
}

