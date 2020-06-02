import React, {Component} from "react";
import {DropdownButton, Dropdown} from 'react-bootstrap'
import {Ax} from "../helpers";
import {Api} from "../globals/Constants";


export class Friends extends Component{

    constructor(props) {
        super(props);
        this.state = {
            friendlist: null,
        }
        this.socket = this.props.params.ioSocket

    }

    componentDidMount() {
        this.getFriends()
    }

    getFriends = () => {
        this.socket.on('friendList', friends => {
            console.log('friends list', friends);
            this.setState({friendlist: friends.data})

        })
        this.socket.emit('getFriendList')
       /* Ax.get(Api.friendList).then(res => {
            console.log('user data', res.data)
            if (res.data.status && res.data.status === true) {
                this.setState({
                    friendlist: res.data.data
                })
            }
        })*/
    }


    openRoom = (room) => {
        room.type = 'user'
        this.props.dispatecher({data: room, isBlock: 'chatroom'})
    }

    render() {
        return (
            (this.state.friendlist) ?
            <div className="friends-block col-12 rounded">
                <div className="header bg-warning rounded p-3 ">
                    <h2 className="title">Друзья</h2>

                </div>
                <div className="user-list col-12 p-0">
                    <ul className="list-box col-12 p-0">
                        {this.state.friendlist.map((user, index) => (

                        <li className="user d-flex justify-content-between p-2 mb-0" key={index}>
                            <div className="left-block-f d-flex p-2" >
                                <img src={require('../assets/images/bg-01.jpg').default} alt="1" className="avatar"/>
                                <div className="user-header ml-5 d-block">
                                    <p className="name ">{user.login}</p>
                                    <button className="message" onClick={() => this.openRoom(user)}>Write message</button>
                                </div>
                            </div>
                            <div className="right-block-f" >
                                <DropdownButton id="dropdown-basic-button dropdown-variants-Warning" variant={'warning'} title="">
                                    <Dropdown.Item href="#/action-1"></Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Пригласить в группу</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </li>
                        ))}
                        <li className="user d-flex justify-content-between p-2 mb-0" >
                            <div className="left-block-f d-flex p-2" >
                                <img src={require('../assets/images/bg-01.jpg').default} alt="1" className="avatar"/>
                                <div className="user-header ml-5 d-block">
                                    <p className="name ">BoJack Horseman </p>
                                    <button className="message">Write message</button>
                                </div>
                            </div>
                            <div className="right-block-f" >
                                <DropdownButton id="dropdown-basic-button dropdown-variants-Warning" variant={'warning'} title="">
                                    <Dropdown.Item href="#/action-1"></Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </li>




                    </ul>
                </div>
            </div>
                : <div><h1>Wait data is downloading</h1></div>
        )
    }
}



