import React, {Component} from "react";
//import {Link} from "react-router-dom";

const scrollTop = () => {
    window.scrollTo(0, 0)
}

class Header extends Component {

    componentDidMount() {
        scrollTop();
    }


    render() {
        return (
            <React.Fragment>


            </React.Fragment>
        )
    }
}


export default Header;
