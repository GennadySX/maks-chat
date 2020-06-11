
import UserController from "@controllers/UserController";

export default class UserSocket {
    io: any
    socket: any

    constructor(IO: any, socket: any) {
        this.io = IO
        this.socket = socket
    }

    public run() {

        //get
        this.socket.on("getFriendList", () =>
            new UserController().getUsers(this.socket)
        )

        this.socket.on('user_data', (tokenClient: Object | any) => new UserController().getUser(tokenClient, this.socket))
        this.socket.on("token", (msg:any) => new UserController().getIt(msg, this.socket))


        this.socket.on("inviteList", () =>
            new UserController().getInviteList(this.socket)
        )

        //create



        //destroy


        //update
        this.socket.on("user_account",(userData: Object | any) => new UserController().accoutUpdate(userData, this.socket))
        this.socket.on("addFriend", (userData: Object | any ) => new UserController().addFriend(userData, this.socket))

    }
}
