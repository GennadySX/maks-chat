import { Emits } from '@const/SocketEmit/Emits'

export default class ChatSocketController {
    socket: any;
    message: object;

    constructor (props: any, socket: any ) {
        this.message = props;
        this.socket = socket;
    }
    
    public chatIncetpDb(id: string, time: any) {
        console.log('I received a private message by ', id, ' saying ', this.message);

        this.socket.emit(Emits.message, this.message);

        this.socket.emit(Emits.sendMessage, `${time}: ${id}: ${this.message}`); // это придется переписать под шаблон клиента

        this.socket.emit(Emits.upload, (data: any) => {
            
        })
    }

}