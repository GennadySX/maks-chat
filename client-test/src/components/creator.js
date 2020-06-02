

import React, {Component} from "react";
import {FormControl, InputGroup, Button} from "react-bootstrap";
import axios from 'axios'
import $ from 'jquery'

//globals
import {Api} from "../globals/Constants";

const avatar  = require('../assets/images/bg-01.jpg').default

export class Creator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatar: avatar,
            loading: false,
            data: {
                name: "group1_564654",
                type: "group",
            },
            user: [],
            type: (this.props.type) ? this.props.type.prevPage : 'group'
        }
    }

    componentDidMount() {
        let  user = localStorage.getItem('user')
        if(!user) window.location.href = '/'
        user = JSON.parse(user)
        this.setState({user: user})


    }

    changeHandler = (e) => {
        const item = $(e.target).data('item'), val = $(e.target).val()
        let data = this.state.data
        console.log('item is', item)
        data[item] = val
        this.setState({data: data})
    }



    sendIt = (e) => {
        e.preventDefault()
        let instane = this.state.data
        instane.avatar =  this.state.avatar
        instane.members = {
            user_id: this.state.user._id
        }
        console.log('state data of user', instane)
        axios.post(Api.url+'crud/create/'+this.state.type, instane).then(res => {
            console.log('created is ', res.data)
            if (res.data && res.data.type) {
                this.props.states(this.state.type)
            }

        })
    }

    render() {
        return (
            (this.state.loading) ?
                <div></div> :
                <div className="account-block creator p-2">
                    <div className="edit-profile col-12 p-5 ">
                        <div className="block avatar d-flex justify-content-center mb-5">
                            <img src={this.state.avatar} alt=""/>
                            <div className="child-block d-block">
                                <label htmlFor="avatar-source" className='btn btn-warning '>Change</label>
                                <input type={'file'} className={'d-none'} data-item={'avatar'} id={'avatar-source'} onChange={(e) => this.setState({  avatar: URL.createObjectURL(e.target.files[0])})} />
                            </div>
                        </div>
                        <div className="block d-flex mb-3">
                            <InputGroup className="mb-3 col-12">
                                <InputGroup.Prepend> <InputGroup.Text
                                    id="basic-addon1">Title</InputGroup.Text></InputGroup.Prepend>
                                <FormControl  data-item={'name'} value={(this.state.data && this.state.data.name) ? this.state.data.name : '' }  onChange={this.changeHandler} />
                            </InputGroup>

                        </div>

                        <div className="block mt-3">
                            <InputGroup className="mb-3 col-6">
                                <Button className={'btn-success'} onClick={this.sendIt}>Создать</Button>
                            </InputGroup>

                        </div>

                    </div>
                </div>
        )
    }
}



