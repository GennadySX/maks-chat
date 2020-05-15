import { Emits } from '@const/SocketEmit/Emits'
import { isObject } from 'util';

export default class ChatSocketController {
    socket: any;
    message: object;

    constructor (props: any, socket: any ) {
        this.message = props;
        this.socket = socket;
    }

    public chatIncetpDb(username: string, room: string, time: string) {
        console.log( username, ' сказал ', this.message); // исключительно для тестирования

        this.socket.emit(Emits.message, this.message);

        this.socket.emit(Emits.sendMessage, (cb: any) => {
            this.socket.emit(Emits.message, this.message);
            cb('Доставлено!');
        }); // это придется переписать под шаблон клиента

        // this.socket.emit(Emits.upload, file);
    }

}