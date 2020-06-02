import React from 'react';
import $ from 'jquery'
import {Form, Button, Container} from "react-bootstrap";
import openSocket from 'socket.io-client';

//globals
import {Api} from '../globals/Constants'

//socket
const socket = null

class HomePage extends React.Component {
    constructor() {
        super()
        this.state = {
            mess: []
        }
       localStorage.getItem('token') ?  this.socketPack() : null

    }


    socketPack = () => {
        const _ = this
        socket.on('message', function (msg) {
            console.log('msg', msg)
            let messages = _.state.mess
            messages.push(msg)
            _.setState({
                mess: messages
            });
            console.log(_.state.mess)
        });
    }


    clicked = () => {
        const ms =   $('.message').val()
        $('.message').val('')
        socket.emit('mss', ms, function (data) { // args are sent in order to acknowledgement function
            console.log(data); // data will be 'tobi says woot'
            socket.emit('message', "name");
        });

    }

    render() {
        return (
            <div>
                <Container className="p-5 bg-light">
                    <Form>
                        <div className={'pt-4'}>
                            {(this.state.mess) ? this.state.mess.map((mes, index) =>  <p key={index}> {mes}</p>) : null}

                        </div>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Сообщение</Form.Label>
                            <Form.Control className={'message'} as="textarea" rows="3" placeholder="message" />
                        </Form.Group>

                        <Button variant="success" size="lg" block
                                onClick={() => this.clicked()}>
                            Подключится
                        </Button>
                    </Form>

                </Container>
            </div>
        );
    }
}

export default HomePage;
