import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


import Header from './Header';

import Footer from "./Footer";

const LayoutContent = (props) => {
    return <React.Fragment>
        <Header />
                {props.children}
        <Footer />
    </React.Fragment>
}



class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
                 <LayoutContent {...this.props} />
        );
    }
}


export default withRouter((Layout));
