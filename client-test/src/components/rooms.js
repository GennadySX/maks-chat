import React, {Component} from "react";
import {Api} from "../globals/Constants";
import {Ax} from "../helpers";



function TimePaster(props) {
    return <p className="last-message-time pos-absolute right-0 ">{new Date(props.time).getHours()}: {new Date(props.time).getMinutes()} </p>
}


export class Rooms extends Component{
    constructor(props) {
        super(props);
        this.state = {
            roomlist: null
        }
    }

    componentDidMount() {
        console.clear()
        this.getChatHistoryByRoom()
    }

    getChatHistoryByRoom = () => {
        Ax.get(Api.chatList).then(res => {
            console.log('data room list', res.data)
            if (res.data.list) {
                let datas =  res.data.list.sort(function(a, b){
                    var keyA = new Date(a.updatedAt),
                        keyB = new Date(b.updatedAt);
                    if(keyA < keyB) return -1;
                    if(keyA > keyB) return 1;
                    return 0;
                }).reverse()
                this.setState({roomlist: datas})
            }
        })
    }


    openChat = (room) => {
      /*  Ax.post(Api.url+'chat/'+id).then(res => {
            console.log('res data', res.data)
            if (res.data) { }});*/
        this.props.chatOpen(room);


    }


    render() {
        return (
            (!this.state.roomlist) ? <div>Loading...</div> :
            <div className="friends-block chat-room-block col-12 rounded">
                <div className="header bg-success rounded p-3 ">
                    <h2 className="title text-light">Сообщение</h2>
                </div>
                <div className="user-list col-12 p-0">
                    <ul className="list-box col-12 p-0 ">
                        {this.state.roomlist.map((room, index) =>
                            (!room.message.length) ? null  :
                            <li key={index} className="user d-flex justify-content-between p-2 mb-0" onClick={() => this.openChat(room)} >
                                <div className="left-block-f col-11 d-flex p-2 " onClick={() => this.props.chatOpen(room._id)} >
                                    <img src={room.avatar} alt="1" className="avatar"/>
                                    <div className="user-header ml-5 d-block">
                                        <p className="name ">{room.name}</p>
                                        <p className="last-message">{room.message[room.message.length-1]['text']}</p>
                                    </div>
                                    <TimePaster time={room.message.reverse()[0]['created_at']} />
                                </div>
                                <div className="right-block-f m-0" >
                                    <button className='btn btn-danger'>&times;</button>
                                </div>
                            </li>
                        )}

                    </ul>
                </div>
            </div>
        )
    }
}



