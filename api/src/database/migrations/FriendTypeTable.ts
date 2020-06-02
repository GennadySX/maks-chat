import {createSchema, Type} from "ts-mongoose";
import {RoomConst} from "@const/Model/RoomConst";

const FriendTypeSchema = createSchema(
    {
        name: Type.string({ required: true}),
        type: Type.string({ required: true}),
    },
    { timestamps: { createdAt: true, updatedAt: true } }
);


export  {
    FriendTypeSchema
}

