import any = jasmine.any;

export default class ChatSocket {
    socket: any
    msg: any

    constructor(props: any, msg: any) {
        this.socket = props
        this.msg = msg
    }


    public chat() {
        console.log('this msg is', this.msg)
    }



}
