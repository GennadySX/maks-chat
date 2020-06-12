import React, {Component} from "react";
import $ from 'jquery'
import { WSList} from "../../globals/Constants";

//socket
let socket = null



class Chatroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            messageList: [],
            message: '',
            user: this.props.user,
            friend: {},
            room: null,
            type: 'private'
        }
        socket = this.props.params.ioSocket
    }
    componentDidMount() {
        this.socketStart()
        this.setIs()
    }

    setIs() {
        const lstore = JSON.parse(localStorage.getItem('chatroom'))
        this.setState({
            title: (lstore.room.name) ? lstore.room.name : `${lstore.friend.firstName} ${lstore.friend.lastName}`,
            messageList: (lstore.room.messageList) ? lstore.room.messageList : [],
            message: '',
            user: this.props.user,
            friend: lstore.friend || {},
            room: lstore.room,
            type: 'private'
        })
    }
    socketStart() {
        $('.messageList').animate({scrollTop: $(document).height() * 50}, 'slow');
        socket.on(WSList.receive, (msg, _ = this) => {
            console.log('got message', msg)
                _.setState({messageList: [...this.state.messageList, msg[0]]})
                $('.messageList').animate({scrollTop: $(document).height() * 50}, 'slow');
        });
    }
    sendMess = () => {
        const {messageList, room,  user, message} = this.state,
            nmessage = {
                sender_id: user._id,
                type: "text",
                text: message,
            }
        console.log('get state this room', this.state.room._id)
        socket.emit(WSList.send, {_id: room._id}, nmessage);
        this.setState({messageList: [...messageList, nmessage], message: ""})
        $('.messageList').animate({scrollTop: $(document).height() * 50}, 'slow');
    }


    render() {
        return (

            <div className="chat-block ">
                <div className="left-block-c col-12 p-0 m-0">
                    <div className="header d-flex justify-content-between">
                        <p className="title-room">{this.state.title}</p>
                        <div className="setting-room">
                            <button className="btn btn-warning ">Info</button>
                        </div>
                    </div>
                    <div className="chat-board mb-5 ">
                        <ul className='overflow-auto  messageList'>
                            { this.state.messageList.map((message, index) => (
                                <li className={(message.sender_id !== this.state.user._id) ? "from" : "to "} key={index}>
                                    <p>{message.text}</p>
                                </li>
                            )) }
                        </ul>
                    </div>
                    <div className="pen-panel pos-absolute bottom-0 col-12 ">
                        <div className="form-group d-flex justify-content-between m-0 mb-1">
                            <input cols="20" rows="1"
                                   value={this.state.message}
                                   onChange={(e) => this.setState({message: $(e.target).val()})}
                                   className="form-control col-10 m-text"
                                   placeholder={'Сообщение...'}
                                   onKeyDown={(e) => {
                                       if (e.keyCode === 13 && this.state.message.trim(' ') !== '') this.sendMess();
                                   }}
                            />
                            <button className="btn  send" onClick={() => {
                                if (this.state.message.trim(' ') !== '') this.sendMess()
                            }}>Отправить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export {
    Chatroom
}
