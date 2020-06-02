import React, {Component} from "react";
import {DropdownButton, Dropdown} from 'react-bootstrap'
import {Ax} from "../helpers";
import {Api} from "../globals/Constants";


/*const newsJson = [
    {
        _id: 'da65s4d6a54sd3a21sd5a',
        status: true,
        title: 'Скидка! Eldorado prestavlyaet',
        data: [
            {
                name: "Samsung Galaxy S20",
                cost: 5465,
                gallery: [
                    {img: 'public/gallery/eldorado/inaskd.jpg'},
                    {img: 'public/gallery/eldorado/inaskd.jpg'},
                    {img: 'public/gallery/eldorado/inaskd.jpg'},
                    {img: 'public/gallery/eldorado/inaskd.jpg'},
                ],
            },
            {
                name: "Samsung Galaxy A5",
                cost: 75465,
                gallery: [
                    {img: 'public/gallery/eldorado/isnaskd.jpg'},
                    {img: 'public/gallery/eldorado/isnaskd.jpg'}
                ],
                text: 'desa ashdkajsd akjsd akjsdh ajshdgye eury sndb hasdkajsdhba shd asjdha sdygaosd',
                source: [
                    {item: '/public/documentation.pdf'},
                ]
            },
        ],
        createdAt: "2020-02-02 18:10",
        liked: 0,
        viewed: 2745
    }
]*/

export class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            friendlist: null
        }
    }

    componentDidMount() {
        this.getFriends()
    }

    getFriends = () => {
        Ax.get(Api.news).then(res => {
            console.log('user data', res.data)

            if (res.data.status && res.data.status === true) {
                this.setState({
                    friendlist: res.data.data
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

            <div className="friends-block  col-12 rounded">
                <div className="header bg-warning rounded p-3 ">
                    <h2 className="title">Новости</h2>

                </div>
                <div className="user-list new-page col-12 p-0">
                    <ul className="list-box col-12 p-0">
                        {
                            (this.state.friendlist) ? this.state.friendlist.map((user, index) => (
                                <li className="user d-flex justify-content-between p-2 mb-0" key={index}>
                                    <div className="left-block-f d-flex p-2">
                                        <img src={require('../assets/images/bg-01.jpg').default} alt="1"
                                             className="avatar"/>
                                        <div className="user-header ml-5 d-block">
                                            <p className="name ">{user.login}</p>
                                            <button className="message" onClick={() => this.openRoom(user)}>Write
                                                message
                                            </button>
                                        </div>
                                    </div>
                                    <div className="right-block-f">
                                        <DropdownButton id="dropdown-basic-button dropdown-variants-Warning"
                                                        variant={'warning'} title="">
                                            <Dropdown.Item href="#/action-1"></Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </DropdownButton>
                                    </div>
                                </li>
                            )) : (
                                <li className="user d-flex justify-content-between p-2 mb-0">
                                    <div className="left-block-f d-flex p-2">
                                        <img src={require('../assets/images/bg-01.jpg').default} alt="1"
                                             className="avatar"/>
                                        <div className="user-header ml-5 d-block">
                                            <p className="name ">BoJack Horseman </p>
                                            <button className="message">18:40 04 Feb</button>
                                        </div>
                                    </div>
                                    <div className="right-block-f">
                                        <DropdownButton id="dropdown-basic-button dropdown-variants-Warning"
                                                        variant={'warning'} title="">
                                            <Dropdown.Item href="#/action-1"></Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </DropdownButton>
                                    </div>
                                </li>
                            )}
                    </ul>
                </div>
            </div>

        )
    }
}



