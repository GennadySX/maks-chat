//plugins
const siofu: any = require("socketio-file-upload")
const md5: any = require('js-md5')

export default class UploaderSocket {
    io: any
    socket: any
    socketUploder = new siofu()

    constructor(io: any, socket: any) {
        this.io = io
        this.socket = socket
    }


    public run() {
        this.socketUploder.listen(this.socket);
        this.socketUploder.dir = './uploads';
        this.socketUploder.on("start", async (event: any) => {
            console.log('file get from react ', event)
            event.file.name = md5(event.file.name + new Date().toString()) + '.' + event.file.name.toString().split('.').pop()
            console.log(event.file.name);
            this.socket.emit('file_emit', event)
        });
    }


}
