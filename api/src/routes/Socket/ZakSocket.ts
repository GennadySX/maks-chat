
import ChatSocketController from '@controllers/SocketControllers/ChatSocketController';
import { Emits, systemMessages } from '@const/SocketEmit/Emits'

export default class ZakSocket {
    io: any
    socket: any
    constructor(props: any, socket: any) {
        this.io     = props
        this.socket = socket
    }

    public run = (io = this.io, socket = this.socket) => {

        // const uploader  = new SocketIOFileUpload();
        // uploader.listen(socket);
        console.log(`New WebSocket connection.`);

        socket.on(Emits.join, (obj: {username: string, room:string }) => {
            socket.join(obj.room);

            socket.to(obj.room).emit(Emits.message, systemMessages(`${obj.username}, Добро пожаловать в чат!`));
            socket.broadcast.to(obj.room).emit(Emits.message, systemMessages(`К нам присоеденился - ${obj.username}!`));

            socket.on(Emits.sendMessage, (msg: object) => {
                const timeLocal = process.hrtime().toString(); // время отправки сообщения, если при тестировании не сработает, использовать (new Date).toLocalTimeString()
                new ChatSocketController(msg, io).chatIncetpDb(obj.username, obj.room, timeLocal);

            })

            socket.on(Emits.disconnect, () => {
                io.to(obj.room).emit(Emits.message, systemMessages(`${obj.username} не в сети.`));
            });
        })

        socket.on(Emits.disconnect, () => {
            io.emit(Emits.message, systemMessages(`Session is closed!`));
        });
    }
}


