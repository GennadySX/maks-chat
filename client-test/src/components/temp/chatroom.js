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
            title: (this.props.roomdata.name) ? this.props.roomdata.name : `${this.props.roomdata.firstName} ${this.props.roomdata.lastName}`,
            messagelist: (this.props.roomdata.message) ? this.props.roomdata.message : [],
            message: '',
            user: this.props.user,
            friend: this.props.roomdata,
            data: {}
        }
        console.log('props data is', this.props)
        socket = this.props.params.ioSocket
    }


    componentDidMount() {
        /*if (socket) {
            this.socketStart()
        }*/
    }

    socketStart() {
        socket.emit(WSList.subscribe, this.state.title)
        $('.messageList').animate({scrollTop: $(document).height() * 50}, 'slow');
        socket.on(WSList.receive, (msg, _ = this) => {
            console.log('got message', msg)

            if (msg.from !== _.state.user._id && msg.room === _.state.title) {
                let messages = _.state.messagelist
                messages.push({from: "him", to: "me", text: msg.text, created_at: new Date()})
                _.setState({messagelist: messages})
                $('.messageList').animate({scrollTop: $(document).height() * 50}, 'slow');
            }
        });
    }


    sendMess = () => {

        const nmessage = {
            from: this.state.user._id,
            type: "text",
            to: this.state.friend._id,
            text: this.state.message,
        }

        socket.emit(WSList.send, nmessage);
        socket.emit('dateTest', nmessage);
        let mes = this.state.messagelist
        mes.push(nmessage)
        this.setState({messagelist: mes, message: ""})
        $('.messageList').animate({scrollTop: $(document).height() * 50}, 'slow');

    }

    sendIt = () => {
        let instane = this.state.data
        instane.avatar = avatar
        instane.name = this.state.title
        instane.members = [
            {user_id: this.state.user._id},
            {user_id: this.props.roomdata._id}
        ]

        console.log('state data of user', instane)
        axios.post(Api.crud.create + this.state.type, instane).then(res => {
            console.log('created is ', res.data)
            if (res.data && res.data.type) {
                this.props.states(this.state.type)
            }

        })
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
                            {(this.state.messagelist) ? this.state.messagelist.map((message, index) => (
                                <li className={(message.from !== this.state.user._id) ? "from" : "to "} key={index}>
                                    <p>{message.text}</p>
                                </li>
                            )) : null}
                        </ul>
                    </div>
                    <div className="pen-panel pos-absolute bottom-0 col-12 ">
                        <div className="form-group d-flex justify-content-between m-0 mb-1">
                            <input name="" id="" cols="20" rows="1"
                                   value={this.state.message}
                                   onChange={(e) => this.setState({message: $(e.target).val()})}
                                   className="form-control col-10 m-text"
                                   placeholder={'Сообщение...'}
                                   onKeyDown={(e) => {
                                       if (e.keyCode === 13 && this.state.message.trim(' ') !== '') this.sendMess();
                                   }}
                            ></input>
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
