/**
 * Created by GennadySX on @2020
 */
import Controller from "@controllers/Controller";
import User from "@models/User";
import Tokens from "@models/Tokens";


export default class UserController extends Controller {
    User: any;

    constructor() {
        super(new User());
        this.User = new User()
    }

    public async getIt(data: any, socket: any): Promise<void> {
        //super.getOne({_id: 'asdasdasda5132132132a1sd32'})
        console.log('controller data', socket.user_id)
        socket.emit("token_is", socket.user_id)
    }


    public async addFriend(choise: Object | any, socket: any): Promise<void> {
        if (choise.type) {
            super.update({_id: socket.user_id}, choise, (res: any) => socket.emit('addFriend_answer', res.data.friends))
        }
    }

    public async getInviteList(socket: any): Promise<void> {
        super.getOne({_id: socket.user_id}, async (res: any) => {
            (res && res.data && res.data.invite) ?
                await Promise.all([res.data.invite.map((invite: any, index: number) => {
                    super.getOne({_id: invite.user_id}, (user: any) => {
                        invite.user = user
                    });
                })]).then(res => {
                    socket.emit('getInviteList', res)
                })
                : socket.emit('getInviteList', null)
        })
    }

    public getUser(tokenClient: object | any, socket: any) {
        new Tokens().findWith(tokenClient,
            new User(),
            'user_id',
            (err: Error, data: any) => socket.emit('user_data_res', data)
        )
    }

    public accoutUpdate(userData: object | any, socket: any) {
        new User().updateBy({_id: userData._id}, userData,
            (err: Error, data: any, payload: any) =>
                !err && data ?
                    socket.emit('user_account_put', {data: data, payload: payload})
                    : null
        )
    }


    public async getUsers(socket: any) {
        this.getAll((data: object | any) => socket.emit("friendList", data.data ? data : null))
    }


}