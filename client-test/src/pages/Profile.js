import React from 'react';
import $ from 'jquery'
import {Link} from "react-router-dom";

//globals
//import {Api} from '../globals/Constants'


//components
import {Chat} from "../components/chat";
import {CommonChat} from "../components/Common";
import {News} from "../components/news";
import {Chatroom} from "../components/temp/chatroom"; // Need for first time write message to friend
import {Account} from "../components/account";
import {Friends} from "../components/friends";
import {Groups} from "../components/groups";
import {Creator} from "../components/creator";
import {Invitelist} from "../components/invitelist";

export class ProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isBlock: 'friends',
            mess: [],
            data: [],
            createType: '',
            prevPage: '',
            user: JSON.parse(localStorage.getItem('user')),
            commonChat: []
        }


    }

    componentDidMount() {
        $('.page-blocks #'+this.state.isBlock).addClass('active')
        this.getRooms()
    }


    getRooms = () => {
        const {ioSocket} = this.props.params
       ioSocket.emit('user_data', this.state.user._id)
    }

    activeHandler = (e) => {
        const _ = $(e.target)
        const page = _.attr('id')
        if(page) {
            $('.page-blocks').find('.active').removeClass('active');
            _.addClass('active');
            this.setState({ isBlock: page})
        }
    }

    creator(type) {
        const prevPage = this.state.isBlock
        this.setState({prevPage, isBlock: 'creator', createType: type})
    }

    selector(data) {
        this.setState(data)
    }

    render() {
        return (
            (!this.state.user) ?
                window.location.href = '/'
                :
            <section className="profile bg-dark">
                <div className="container col-10 justify-content-between">
                    <div className="left-block col-3 ">
                        <div className="block-profile">
                            <div className="avatar" >
                                <img src={require('../assets/images/zucker.jpg').default} alt=""/>
                            </div>
                            <div className="blocks-in">
                                <div className="title-block">
                                    <h2 className="name">{(this.state.user.firstName) ? this.state.user.firstName : "Guest"} {(this.state.user.lastName) ? this.state.user.lastName : ""}</h2>
                                </div>
                                <ul className='col-md-12 page-blocks'>
                                    <li className="cs " id={'common-chat'}  onClick={(e) => this.activeHandler(e)}><Link to="#" className='link'>Общий чат</Link></li>
                                    <li className="cs " id={'invitation'}  onClick={(e) => this.activeHandler(e)}><Link to="#" className='link'>Приглашение</Link></li>
                                    <li className="cs " id={'news'}  onClick={(e) => this.activeHandler(e)}><Link to="#" className='link'>Лента</Link></li>
                                    <li className="cs " id={'chat'}     onClick={(e) => this.activeHandler(e)}><Link to="#" className='link'>Чат</Link></li>
                                    <li className="cs " id={'friends'}  onClick={(e) => this.activeHandler(e)}><Link to="#" className='link'>Друзей</Link></li>
                                    <li className="cs " id={'groups'}   onClick={(e) => this.activeHandler(e)}><Link to="#" className='link'>Группы</Link></li>
                                    <li className="cs " id={'account'}  onClick={(e) => this.activeHandler(e)}><Link to="#" className='link'>Профиль</Link></li>
                                    <li className="cs"  id={'settings'} onClick={(e) => this.activeHandler(e)}><Link to="#" className='link'>Настройки</Link></li>
                                    <li className="cs btn-danger "   onClick={() => {
                                        localStorage.removeItem('user')
                                        window.location.href = '/'
                                    }}><Link to="#" className='link text-light '>Выйти</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="right-block col-9 ml-5 pl-0 ">
                        {this.state.isBlock==='common-chat'&& <CommonChat roomdata={this.state.commonChat} dispatecher={(e) =>this.selector(e)} user={this.state.user} {...this.props}/> }
                        {this.state.isBlock==='invitation'&&  <Invitelist dispatecher={(e) =>this.selector(e)} user={this.state.user} {...this.props}/> }
                        {this.state.isBlock==='news'&&  <News dispatecher={(e) =>this.selector(e)}  user={this.state.user} {...this.props}/> }
                        {this.state.isBlock==='chat'&&  <Chat dispatecher={(e) =>this.selector(e)}  user={this.state.user} {...this.props}/> }
                        {this.state.isBlock==='chatroom'&&  <Chatroom roomdata={this.state.data}  dispatecher={this.selector}  user={this.state.user} {...this.props}/> }
                        {this.state.isBlock==='friends'&&  <Friends  dispatecher={(e) =>this.selector(e) } user={this.state.user} {...this.props}/> }
                        {this.state.isBlock==='groups'&&  <Groups create={(e) => this.creator(e)} dispatecher={(e) =>this.selector(e)} user={this.state.user} {...this.props}/> }
                        {this.state.isBlock==='settings'&&  <Account dispatecher={(e) =>this.selector(e) } user={this.state.user} {...this.props}/> }
                        {/*{this.state.isBlock==='settings'&&  <Settings dispatecher={(e) =>this.selector(e) } />}*/}
                        {this.state.isBlock==='creator' &&  <Creator type={this.state} states={(e) =>this.setState({isBlock: e})} user={this.state.user} {...this.props}/> }
                    </div>
                </div>
            </section>
        );
    }


}


