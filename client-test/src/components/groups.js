import React, {Component} from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";
import {Ax} from "../helpers";
import {Api} from "../globals/Constants";




export class Groups extends Component{
    constructor(props) {
        super(props);
        this.state = {
            grouplist: null,
            invitingGroupId: null,
            showFriendList: false
        }
    }

    componentDidMount() {

        this.getGroupList()
    }

    getGroupList() {
        Ax.get(Api.groupList).then(res => {
            console.log('group lists are here', res.data)
            if (res.data.list)
                this.setState({grouplist: res.data.list.reverse()})
        })
    }

    leaveFrom = (group) => {
        const data = {
            _id: group._id
        }
        console.log('send data ', data)
        Ax.post(Api.crud.delete+'groups', group).then(res => {
            console.log('group lists are here', res.data)
             if (res.data.status)  this.getGroupList()
        })
    }



    openRoom = (room) => {
       this.props.dispatecher({data: room, isBlock: 'chatroom'})
    }


    friendlist = (id) => {
        this.setState({invitingGroupId: id})

    }

    render() {
        return (
            (!this.state.grouplist) ? (
                <div className={'text-light'}>Loading...</div>
            ) : (
            <div className="friends-block groups-block col-12 rounded">
                <div className="header rounded p-3 d-flex justify-content-between">
                    <h2 className="title">Сообщества</h2>
                    <button className={'btn btn-success'} onClick={() => this.props.create('groups') }>+ Создать</button>
                </div>
                <div className="user-list col-12 p-0">
                    <ul className="list-box col-12 p-0">
                        {this.state.grouplist.map((group, index) =>
                        <li className="user d-flex justify-content-between p-2 mb-0" key={index} >
                            <div className="left-block-f d-flex p-2" onClick={() => this.openRoom(group)}>
                                <img src={require('../assets/images/bg-01.jpg').default} alt="1" className="avatar"/>
                                <div className="group-header ml-5 d-block">
                                    <p className="name ">{group.name} </p>
                                    <p className="members ">{group.members.length} users</p>
                                </div>
                            </div>
                            <div className="right-block-f" >
                                <DropdownButton id="dropdown-basic-button dropdown-variants-Warning" variant={'warning'} title="">
                                    <Dropdown.Item href="#/action-1" onClick={() => this.friendList(group._id)}>Пригласить друга</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2" onClick={() => this.leaveFrom(group)}>Выйти</Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </li>
                        )}
                        <li className="user d-flex justify-content-between p-2 mb-0" >
                            <div className="left-block-f d-flex p-2" >
                                <img src={require('../assets/images/bg-01.jpg').default} alt="1" className="avatar"/>
                                <div className="group-header ml-5 d-block">
                                    <p className="name ">Exampler </p>
                                    <p className="members ">15 414 users</p>
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
         )
        )
    }
}


