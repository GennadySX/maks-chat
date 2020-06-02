import React, {Component} from "react";
import $ from 'jquery'
import {Api, WSList} from "../globals/Constants";
import SocketIOFileUploader from 'socketio-file-upload'
import axios from "axios";
//socket

const avatar  = require('../assets/images/bg-01.jpg').default

class CommonChat extends Component{
    constructor(props) {
        super(props);
        this.state = {
            room_id: null,
            title: null,
            messagelist: [],
            message: '',
            user: JSON.parse(localStorage.getItem('user')),
            data: {},
        }
        this.socket =  this.props.params.ioSocket
        this.socketFile = this.socket ? new SocketIOFileUploader(this.socket) : null;

    }


    componentDidMount() {
        //console.log('common props ', this.props)
        if (this.socket) {
            this.commonInit();
            this.socketStart()
        }
    }


    commonInit = () => this.socket.on('commonChatData', (commonData) => {
        //console.log('common Data is ', commonData);
        commonData && commonData._id ?
            this.setState({room_id: commonData._id, messagelist: commonData.messageList},
               // () => console.log('common chat is ', commonData.messageList)
            )
            : console.log('common data not initable')
    })


    socketStart = () => {
        this.socket.emit(WSList.subscribe, WSList.commonChat)
        $('.messageList').animate({scrollTop: $(document).height()*50}, 'slow');
        this.socket.on("message",  (msg) => {
            //console.log('got message', msg)
            if (msg.from !== this.state.user._id) {
                this.setState({messagelist: [...this.state.messagelist, msg[0]]});
                $('.messageList').animate({scrollTop: $(document).height()*50}, 'slow');
            }
        });
    }

    sendFile= (e)=> {
        console.log('e', e.target.files)
        let file = e.target.files;
        this.socketFile.submitFiles(file);
        // Do something on upload progress:
        this.socketFile.addEventListener("progress", function(event){
            var percent = event.bytesLoaded / event.file.size * 100;
            console.log("File is", percent.toFixed(2), "percent loaded");
        });

        // Do something when a file is uploaded:
        this.socketFile.addEventListener("complete", function(event){
            console.log(event.success);
            console.log(event.file);
        });

    }

    sendMess = () => {
            const nmessage = {
                from: this.state.user._id,
                type: "text",
                //to: (this.props.roomdata.type === "group") ?  null : Object.keys(this.props.roomdata.members).map(val => (this.state.user._id !== val._id) ? val._id : null),
                text: this.state.message,
            }

            console.log('send common message: ', nmessage)
        this.socket.emit('room_send', {_id: this.state.room_id}, nmessage);
            this.setState({messagelist: [...this.state.messagelist, nmessage], message: ""})
             $('.messageList').animate({scrollTop: $(document).height()*50}, 'slow');
    }


    sendIt = () => {
        let instane = this.state.data
        instane.avatar =  avatar
        instane.name = this.state.title
        instane.members = [
            {user_id: this.state.user._id},
            {user_id: this.props.roomdata._id}
        ]

        console.log('state data of user', instane)
        axios.post(Api.crud.create+this.state.type, instane).then(res => {
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
                            <button className="btn btn-warning ">Info </button>
                        </div>
                    </div>
                    <div className="chat-board mb-5 ">
                        <ul className='overflow-auto  messageList'>
                            {(this.state.messagelist) ? this.state.messagelist.map((message, index) => (
                                <li className={ (message.from !== this.state.user._id) ?  "from" : "to " }  key={index}>
                                    <p >{message.text}</p>
                                </li>
                            )) : null }
                        </ul>
                    </div>
                    <div className="pen-panel pos-absolute bottom-0 col-12 ">
                        <div className="form-group d-flex justify-content-between m-0 mb-1">
                            <label htmlFor="sendFile" className={'btn btn-warning mr-2'}>Upload</label>
                            <input type="file" id={'sendFile'}
                                   onChange={(e) => this.sendFile(e)}
                                   className={'d-none'}/>
                                            <input name="" id=""
                                                      value={this.state.message}
                                                      onChange={(e) => this.setState({message: $(e.target).val()})}
                                                      className="form-control col-9 m-text"
                                                      placeholder={'Сообщение...'}
                                                      onKeyDown={(e) =>{ if( e.keyCode === 13 && this.state.message.trim(' ') !=='') this.sendMess();}}
                                            ></input>
                            <button className="btn  send" onClick={() => {if(this.state.message.trim(' ') !=='') this.sendMess() }}>Отправить</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export {
    CommonChat
}
