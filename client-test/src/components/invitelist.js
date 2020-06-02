import React, {Component} from "react";
import {Ax} from "../helpers";
import {Api} from "../globals/Constants";


export class Invitelist extends Component{

    constructor(props) {
        super(props);
        this.socket =  this.props.params.ioSocket;
        this.state = {
            invitationlist: null,
            user: this.props.user,

        }
    }

    componentDidMount() {
        this.getFriends()
    }


    getInviteList() {

        this.socket.on('getInviteList', (user) => {
            console.log('user', user)

        })
    }

    getFriends = () => {
        Ax.get(Api.invitations+'/'+this.state.user._id).then(res => {
            console.log('user data', res.data)

            if (res.data.status && res.data.status === true) {
                this.setState({
                    invitationlist: res.data.data
                })
            }
        })
    }


    openRoom = (room) => {
        room.type = 'user'
        this.props.dispatecher({data: room, isBlock: 'chatroom'})
    }

    render() {
        return (
            (this.state.invitationlist) ?
            <div className="friends-block col-12 rounded">
                <div className="header bg-info rounded p-3 ">
                    <h2 className="title text-white">Список приглашений</h2>

                </div>
                <div className="user-list col-12 p-0">
                    <ul className="list-box col-12 p-0">
                        {this.state.invitationlist.map((invite, index) => (

                        <li className="user d-flex justify-content-between p-2 mb-0" key={index}>
                            <div className="left-block-f d-flex p-2" >
                                <div className="user-header ml-5 d-block">
                                    <p className="name ">{invite}</p>
                                    <button className="message" onClick={() => this.openRoom(invite)}>Write message</button>
                                </div>
                                <button className="btn btn-success">Accept</button>
                                <button className="btn btn-danger">Cancel</button>
                            </div>

                        </li>
                        ))}


                        <li className="user d-flex justify-content-between p-2 mb-0" >
                            <div className="left-block-f  p-2" >
                                <div className="user-header d-flex justify-content-between ml-5 mb-3 d-block">

                                    <p className="name mr-3">Group 3</p>
                                    <p className="name invite-from  mr-3">от James Bond</p>
                                </div>
                                <div className=" ml-5 d-block">
                                    <button className="btn btn-success mr-4">Принять</button>
                                    <button className="btn btn-danger">Игнорировать</button>
                                </div>
                            </div>

                        </li>

                    </ul>
                </div>
            </div>
                : <div className={'bg-light'}><h1>Wait data is downloading</h1></div>
        )
    }
}



