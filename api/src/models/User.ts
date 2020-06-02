import Model from "@models/Model";
import {createSchema, Type, typedModel} from "ts-mongoose";
import {UserConts} from "@const/Model/UserConst";
import {UserSchema} from "@migration/UserTable";

export  interface IUser {
    email: string,
    password: string,
    login: string,
    firstName: string,
    lastName: string,
    avatar: string,
    aboutMe: string
}



class User extends Model{

 /*   public email: string;
    public password: string;
    public login: string;
    public firstName: string;
    public lastName: string;
    public avatar: string;
    public aboutMe: string*/


    constructor(props = typedModel(UserConts.table, UserSchema)) {
        super(props);
      /*  this.email = "";
        this.password = "";
        this.login = "";
        this.firstName = "";
        this.lastName = "";
        this.avatar = "";
        this.aboutMe = "";*/
    }

}

export default User;
