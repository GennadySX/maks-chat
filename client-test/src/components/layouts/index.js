import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {ProfilePage as Profile} from "../../pages/Profile";

const LayoutContent = (props) => {

    return <React.Fragment>
            <Profile dispatcher={(e) => console.log('page to pass', e)} history={props.history} location={props.location} match={props.match} {...props.children.props}>
                {props.children}
            </Profile>
    </React.Fragment>
}



class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {};

    }


    componentDidMount() {
        if (this.props.location.pathname === "/profile") {
            window.location.href = '/profile/common-chat'
        }
    }

    render() {
        return (
                 <LayoutContent {...this.props} />
        );
    }
}


export default withRouter((Layout));
