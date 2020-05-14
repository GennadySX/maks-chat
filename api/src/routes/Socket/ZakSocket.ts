
import ChatSocketController from '@controllers/SocketControllers/ChatSocketController';

export default class ZakSocket {
    io: any
    socket: any
    constructor(props: any, socket: any) {
        this.io     = props
        this.socket = socket
    }

    public run = (io = this.io, socket = this.socket) => {

        const ID    = (socket.id).toString().substr(0, 15);
        const time  = (new Date).toLocaleTimeString()

        console.log(`User ${ID} connected`);

        socket.json.send({
            'event': 'connected',
            'name': ID,
            'time': time,
        });

        // socket.emit.json.send({
        //     'event': 'privateMsg',
        //     'name': ID,
        //     'time': time,
        // });

        socket.on('send message', (msg: object) => {
            new ChatSocketController(msg, io).chatIncetpDb(ID, time);
            // const time = (new Date).toLocaleTimeString();

        })

        socket.on('disconnect', () => {
            io.emit('message', `A user ${ID} has left!`);
        });
    }
}


