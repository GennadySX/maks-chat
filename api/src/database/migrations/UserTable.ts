import {createSchema, Type} from "ts-mongoose";

const UserSchema = createSchema(
    {
        firstName: Type.string({ required: true }),
        lastName: Type.string({ required: true }),
        phone: Type.string({ required: true, unique: true }),
        email: Type.string({ required: true, unique: true }),
        login: Type.string({ required: true }),
        password: Type.string({ required: true }),
        avatar: Type.string({ required: false }),
        aboutMe: Type.string({ required: false }),
    },
    { timestamps: { createdAt: true, updatedAt: true } }
);



export {
    UserSchema
}


