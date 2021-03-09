import React, { Component} from "react";
import {withRouter} from "next/router";
import {loggedIn} from "./jokes";
import {withCookies} from "react-cookie";


class Logout extends Component {

    componentDidMount() {
        if (loggedIn(this.props)){
            this.props.cookies.remove('user');
            return this.props.router.push('/')
        }

        else {
            return this.props.router.push('/')
        }

    }

    render() {
        return <div></div>
    }


}
export default withCookies(withRouter(Logout))