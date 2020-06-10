import React, {Component} from "react";
import $ from 'jquery'
import {Api, WSList} from "../../globals/Constants";

import axios from "axios";
//socket
let socket = null


const avatar = require('../../assets/images/bg-01.jpg').default

class Chatroom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: (this.props.roomdata.name) ? this.props.roomdata.name : `${this.props.roomdata.friend.firstName} ${this.props.roomdata.friend.lastName}`,
            messageList: (this.props.roomdata.message) ? this.props.roomdata.message : [],
            message: '',
            user: this.props.user,
            friend: this.props.roomdata.friend || {},
            room: this.props.roomdata.data || {},
            type: 'private'
        }
        console.log('props data is', this.props)
        socket = this.props.params.ioSocket
    }

    socketStart() {
        socket.emit(WSList.subscribe, this.state.title)
        $('.messageList').animate({scrollTop: $(document).height() * 50}, 'slow');
        socket.on(WSList.receive, (msg, _ = this) => {
            console.log('got message', msg)

            if (msg.from !== _.state.user._id && msg.room === _.state.title) {
                let messages = _.state.messagelist
                messages.push({from: "him", to: "me", text: msg.text, created_at: new Date()})
                _.setState({messageList: messages})
                $('.messageList').animate({scrollTop: $(document).height() * 50}, 'slow');
            }
        });
    }

    roomInit() {
        this.socket.on('room_created', (room) => {
            console.log('room created in and get react ', room)
            this.setState({room: room}, () => this.sendMess())
        })
    }





    sendMess = () => {
        const {messageList, room, friend, user, message, type} = this.state,
            nmessage = {
                from: user._id,
                type: "text",
                to: friend._id,
                text: message,
            }
        if (room && room._id) {
            socket.emit(WSList.send, nmessage);
            socket.emit('dateTest', nmessage);
            this.setState({messageList: [...messageList, nmessage], message: ""})
            $('.messageList').animate({scrollTop: $(document).height() * 50}, 'slow');
        } else {
            socket.emit(WSList.room_create, {user: friend._id});
        }
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
                            {(this.state.messageList) ? this.state.messageList.map((message, index) => (
                                <li className={(message.from !== this.state.user._id) ? "from" : "to "} key={index}>
                                    <p>{message.text}</p>
                                </li>
                            )) : null}
                        </ul>
                    </div>
                    <div className="pen-panel pos-absolute bottom-0 col-12 ">
                        <div className="form-group d-flex justify-content-between m-0 mb-1">
                            <input  cols="20" rows="1"
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
