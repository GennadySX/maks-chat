import React, {Component} from "react";
import {FormControl, InputGroup, Button} from "react-bootstrap";
import SocketIOFileUploader from 'socketio-file-upload'
import $ from 'jquery'

//globals

const avatar = require('../assets/images/zucker.jpg').default

export class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatar: avatar,
            loading: false,
            user: [],
            socket: this.props.params.ioSocket,
            socketFile: new SocketIOFileUploader(this.props.params.ioSocket)
        }

    }

    componentDidMount() {
        let user = localStorage.getItem('user')
        if (!user) window.location.href = '/'
        user = JSON.parse(user)
        this.setState({user: user})
    }


    changeHandler = (e) => {
        let item = $(e.target).data('item'),
            val = $(e.target).val(),
            user = this.state.user
        //console.log('item is', val)
        user[item] = val
        this.setState({user: user})
    }


    uploadImage= (e)=> {
        console.log('e', e.target.files)
        let file = e.target.files;

        this.state.socketFile.submitFiles(file);
        // Do something on upload progress:
        this.state.socketFile.addEventListener("progress", function(event){
            const percent = event.bytesLoaded / event.file.size * 100;
            console.log("File is", percent.toFixed(2), "percent loaded");
        });

        // Do something when a file is uploaded:
        this.state.socketFile.addEventListener("complete", function(event){
            console.log(event.success);
            console.log(event.file);
        });

        this.state.socket.on('file_emit', file => {
            console.log('file get from socket ', file)
        })

    }


    uploadImagex = (e) => {



        this.state.socket.emit('start', e.target.files[0])
        this.setState({avatar: URL.createObjectURL(e.target.files[0])})
    }

    checkConfirm = (e) => {
        console.log('Confirm password')
    }

    sendIt = (e) => {
        this.state.socket.on('user_account_put',
                userUpdated => {
            if (userUpdated && userUpdated.data) {
                localStorage.setItem('user', JSON.stringify(userUpdated.data))
            }
        })
        this.state.socket.emit('user_account', this.state.user)
    }


    tokenCheck = () => {
        this.state.socket.on('token_is', (socket, io) => {
            console.log('token socket is', socket)
            console.log('token io is', io)
        })

        this.state.socket.emit('token', {token: true});

    }

    render() {
        return (
            (this.state.loading) ?
                <div></div> :
                <div className="account-block  p-2">
                    <div className="edit-profile col-12 p-5 ">
                        <div className="block avatar d-flex justify-content-center mb-5">
                            <img src={this.state.avatar} alt=""/>
                            <div className="child-block d-block">
                                <label htmlFor="avatar-source" className='btn btn-warning '>Change</label>
                                <input type={'file'} className={'d-none'} data-item={'avatar'} id={'avatar-source'}
                                       onChange={this.uploadImage}/>
                            </div>
                        </div>
                        <div className="block d-flex mb-3">
                            <InputGroup className="mb-3 col-6">
                                <InputGroup.Prepend> <InputGroup.Text
                                    id="basic-addon1">Firstname</InputGroup.Text></InputGroup.Prepend>
                                <FormControl placeholder="Ваше имя"
                                             data-item={'firstName'}
                                             value={(this.state.user && this.state.user.firstName) ? this.state.user.firstName : ''}
                                             onChange={this.changeHandler}/>
                            </InputGroup>
                            <InputGroup className="mb-3 col-6">
                                <InputGroup.Prepend> <InputGroup.Text
                                    id="basic-addon1">Lastname</InputGroup.Text></InputGroup.Prepend>
                                <FormControl placeholder="Ваша фамилия" data-item={'lastName'}
                                             value={(this.state.user && this.state.user.lastName) ? this.state.user.lastName : ''}
                                             onChange={this.changeHandler}/>
                            </InputGroup>

                        </div>
                        <div className="block d-flex mb-3">
                            <InputGroup className="mb-3 col-6">
                                <InputGroup.Prepend> <InputGroup.Text
                                    id="basic-addon1">Email</InputGroup.Text></InputGroup.Prepend>
                                <FormControl placeholder={"example@example.com"}
                                             data-item={'email'}
                                             value={(this.state.user && this.state.user.email) ? this.state.user.email : ''}
                                             onChange={this.changeHandler}/>
                            </InputGroup>
                            <InputGroup className="mb-3 col-6">
                                <InputGroup.Prepend> <InputGroup.Text
                                    id="basic-addon1">Phone</InputGroup.Text></InputGroup.Prepend>
                                <FormControl placeholder={"+7 999 999 99 99"}
                                             data-item={'phone'}
                                             value={(this.state.user && this.state.user.phone) ? this.state.user.phone : ''}
                                             onChange={this.changeHandler}/>
                            </InputGroup>

                        </div>
                        <div className="block d-flex mb-3">
                            <InputGroup className="mb-3 col-12">
                                <InputGroup.Prepend> <InputGroup.Text
                                    id="basic-addon1">Username</InputGroup.Text></InputGroup.Prepend>
                                <FormControl placeholder={"example@example.com"}
                                             data-item={'login'}
                                             value={(this.state.user && this.state.user.login) ? this.state.user.login : ''}
                                             onChange={this.changeHandler}/>
                            </InputGroup>

                        </div>
                        <div className="block mt-3">
                            <InputGroup className="mb-3 col-12">
                                <Button className={'btn-success col-12'} onClick={this.sendIt}>Сохранить</Button>
                            </InputGroup>
                        </div>
                        <div className="block mt-3">
                            <InputGroup className="mb-3 col-12">
                                <Button className={'btn-success col-12'} onClick={this.tokenCheck}>Token check</Button>
                            </InputGroup>
                        </div>
                    </div>
                </div>
        )
    }
}



