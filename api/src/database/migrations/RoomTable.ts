import {createSchema, Type, typedModel} from "ts-mongoose";
import {RoomConst} from "@const/Model/Room";

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
        type: Type.string({ required: true, enum: RoomConst.chat.type as any}),
        from: Type.objectId({required: true}),
        to: Type.objectId({required: false}),
        msg: Type.string({required: true}),
    },
    { _id: true, timestamps: true }
);

const Admins = createSchema({
        user: Type.objectId({ required: true }),
        invitedBy: Type.objectId({ required: true }),
    },{_id: false, timestamps: true}
);

export  interface IRoom {
    name: string,
    avatar: string,
    type: Array<string>,
    chat: Array<object>,
    members: Array<object>,
    owner: string,
    admins: Array<object>,
    createdAt: string,
    updatedAt: string,
}

const RoomSchema = createSchema(
    {
        name: Type.string({ required: false }),
        avatar: Type.string({ required: true }),
        type: Type.string({ required: true, enum: RoomConst.type }),
        chat: Type.schema({ required: true }).of(Chat),
        members: Type.schema({ required: true }).of(Members),
        admins: Type.schema({ required: true }).of(Admins),
        owner: Type.objectId({ required: true }),
    },
    { timestamps: { createdAt: true, updatedAt: true } }
);



export  {
    RoomSchema
}

