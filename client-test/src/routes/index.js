
import Register from "../pages/Register";
import {ProfilePage} from "../pages/Profile";
import {CommonChat} from "../components/Common";
import {Invitelist} from "../components/invitelist";
import {News} from "../components/news";
import {Chat} from "../components/chat";
import {Chatroom} from "../components/temp/chatroom";
import {Friends} from "../components/friends";
import {Groups} from "../components/groups";
import {Settings} from "../components/settings";
import {Creator} from "../components/creator";
import {Account} from "../components/account";
import React from "react";
const routes = [

    {path: '/profile/common-chat', component: CommonChat},
    {path: '/profile/invitation', component: Invitelist},
    {path: '/profile/news', component: News},
    {path: '/profile/chat', component: Chat},
    {path: '/profile/chatroom', component: Chatroom},
    {path: '/profile/friends', component: Friends},
    {path: '/profile/groups', component: Groups},
    {path: '/profile/settings', component: Account},
    {path: '/profile/creator', component: Creator},
    //
    {path: '/profile', component: CommonChat},
    {path: '/', component: Register}




];


export default routes;


const d = () => {
    return (
        <>
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
        </>
    )
}