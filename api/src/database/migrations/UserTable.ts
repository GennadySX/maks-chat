import {createSchema, Type} from "ts-mongoose";
import {FriendTypeSchema} from "@migration/FriendTypeTable";
import {UserConts} from "@const/Model/UserConst";



const MemberGroups = createSchema(
    {
        group: Type.objectId({ required: true })
    },
    { _id: false, timestamps: true }
);

const Friends = createSchema(
    {
        user: Type.objectId({ required: true }),
        type: Type.schema({ required: true }).of(FriendTypeSchema),
    },
    { _id: false, timestamps: true }
);

const Invite = createSchema(
    {
        user: Type.objectId({ required: true }),
        type: Type.string({ required: true, enum: UserConts.invite.type as any}),
        //required
        status: Type.string({ required: true, enum: UserConts.invite.status as any}),
    },
    { _id: false, timestamps: true }
);

const Ignore = createSchema(
    {
        user: Type.objectId({ required: true }),
        //optional
        status: Type.string({ required: true, enum: UserConts.invite.status as any}),
    },
    { _id: false, timestamps: true }
);


const UserSchema = createSchema(
    {
        firstName: Type.string({ required: false }),
        lastName: Type.string({ required: false }),
        phone: Type.string({ required: false }),
        email: Type.string({ required: true, unique: true }),
        login: Type.string({ required: true, unique: true }),
        password: Type.string({ required: true }),
        avatar: Type.string({ required: false }),
        aboutMe: Type.string({ required: false }),
        friends: [Type.schema({ required: false }).of(Friends)],
        groups: [Type.schema({ required: false }).of(MemberGroups)],
        ignore: [Type.schema({ required: false }).of(Ignore)],
        invite: [Type.schema({ required: false }).of(Invite)],
    },
    { timestamps: { createdAt: true, updatedAt: true } }
);



export {
    UserSchema
}


