import {createSchema, Type} from "ts-mongoose";

const UserSchema = createSchema(
    {
        firstName: Type.string({ required: true }),
        lastName: Type.string({ required: true }),
        phone: Type.string({ required: true }),
        email: Type.string({ required: true, unique: true }),
        login: Type.string({ required: true }),
        password: Type.string({ required: true }),
        avatar: Type.string({ required: true }),
        aboutMe: Type.string({ required: true }),
        created_at: Type.date({ default: Date.now as any }),
    },
    { timestamps: { createdAt: true } }
);



export {
    UserSchema
}


