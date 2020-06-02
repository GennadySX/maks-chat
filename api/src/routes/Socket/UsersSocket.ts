
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

        this.socket.on("inviteList", () =>
            new UserController().getInviteList(this.socket)
        )

        //create



        //destroy


    }
}
