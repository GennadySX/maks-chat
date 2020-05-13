import Model from "@models/Model";

export  interface IUser {
    email: string,
    password: string,
    login: string,
    firstName: string,
    lastName: string,
    avatar: string,
    aboutMe: string
}


class User extends Model implements IUser {

    public email: string;
    public password: string;
    public login: string;
    public firstName: string;
    public lastName: string;
    public avatar: string;
    public aboutMe: string

    constructor(props: any) {
        super(props);

        this.email = "";
        this.password = "";
        this.login = "";
        this.firstName = "";
        this.lastName = "";
        this.avatar = "";
        this.aboutMe = "";

    }

}

export default User;
