import {createSchema, Type} from "ts-mongoose";



const UserAgent = createSchema(
    {
        deviceName: Type.string({ required: false }),
        ip: Type.string({required: false}),
    },
    { _id: false, timestamps: true }
);

const TokenSchema = createSchema(
    {
        user_id: Type.objectId({required: true, ref: "User"}),
        token: Type.string({required: true}),
        expireAfter: Type.date({default: new Date() as any}),
        userAgent: Type.schema({required: true}).of(UserAgent)
    },
    {timestamps: {createdAt: true, updatedAt: true}}
);


export {
    TokenSchema
}


