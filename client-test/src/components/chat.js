import React, {Component} from "react";
import {Rooms} from "./rooms";


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room: null,
            roomlist: null
        }
    }



    componentDidMount() {
        console.log('chat props ', this.props)
    }

    chatSet = (room) => {

        this.props.dispatecher({isBlock: 'chatroom', data: room})
    }


    render() {
        return (
            (!this.state.room) ?
                <Rooms roomList={this.state.roomlist} chatOpen={this.chatSet}  />
                : <div className="chat-block ">

                </div>
        )
    }
}


export {
    Chat
}
