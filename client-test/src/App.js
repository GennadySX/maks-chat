import React, {Component} from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Layout from './components/layouts/';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './routes/index'
import './styles/App.scss';
import openSocket from "socket.io-client";
import {Api} from "./globals/Constants";

function withLayout(WrappedComponent, route, params = null) {
    return class extends React.Component {
        render() {
            return (route === '/chat') ?
                <Layout>
                    <WrappedComponent
                        params={params ? params : null}/>
                </Layout>
                : <WrappedComponent
                    params={params ? params : null}/>
        }
    };
}


const token = localStorage.getItem('token')

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ioSocket: token ? openSocket(Api.ws, {
                query: {
                    token: token
                },
                transports: ['websocket']
            }) : null,

            token: token
        }


    }

    render() {
        return (
            <React.Fragment>
                <Router>
                    <Switch>
                        {routes.map((route, idx) =>
                            <Route path={route.path}
                                   component={withLayout(route.component, route.path, this.state)} key={idx}/>
                        )}
                    </Switch>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
