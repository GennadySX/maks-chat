import React from 'react';
//import $ from 'jquery'
import axios from 'axios'
import {Link} from "react-router-dom/";

//globals
import {Api} from '../globals/Constants'



//assets
const imgWall = './images/bg-01.jpg'


class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            mess: [],
            label: 'Войти',
            islogin: true,
            login: 'johndoe',
            email: "johndoe@mail.com",
            password: 'unlockme'
        }
    }


    componentDidMount() {
        const user = localStorage.getItem('user')
        if(user) {
            this.setState({user: user});
            window.location.href = '/profile'
        }
    }


    handleChanger = (e, item) => {
        this.setState({
            [item]: e.target.value
        });
    }

    userLogin = (e) => {
        e.preventDefault()
        console.log('login send data', this.state)
        axios.post(Api.login, this.state).then(res => {
            console.log('user data ', res.data)
                if (res.data.status && res.data.user && res.data.token ) {
                    localStorage.setItem('token',res.data.token)
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    setTimeout(() => {
                        window.location.href = '/profile'
                    }, 1000)
                }
        })

    }

    userRegister = (e) => {
        e.preventDefault()
         console.log('register', Api.register)
        axios.post(Api.register, this.state).then(res => {
            console.log('res data', res.data)
            if (res.data.status) {
                console.log('signing data ', res.data)
                this.setState({label: "Войти", islogin: true})
            }

        })
    }


    sendIt = (e) => (this.state.islogin) ? this.userLogin(e) : this.userRegister(e)


    render() {
        return (
            <div className="container-login100" style={{backgroundImage: `url(${imgWall})`}}>
                <div className="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30">
                    <form className="login100-form validate-form">
                        <span className="login100-form-title p-b-37">
                            {this.state.label}
                        </span>
                        <div>
                            {this.state.islogin ?
                                <>
                                    <div className="wrap-input100 validate-input m-b-20"
                                         data-validate="Enter username or email">
                                        <input className="input100" type="text" name="username"
                                               placeholder="Логин или email"
                                               value={this.state.login}
                                               onChange={(e) => this.handleChanger(e, 'login')}/>
                                        <span className="focus-input100"></span>
                                    </div>
                                    <div className="wrap-input100 validate-input m-b-25" data-validate="Enter password">
                                        <input className="input100" type="password" name="pass" placeholder="пароль"
                                               value={this.state.password}
                                               onChange={(e) => this.handleChanger(e, 'password')}/>
                                        <span className="focus-input100"></span>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="wrap-input100 validate-input m-b-20"
                                         data-validate="Enter username or email">
                                        <input className="input100" type="text" name="username"
                                               placeholder="Логин или email"
                                               value={this.state.login}
                                               onChange={(e) => this.handleChanger(e, 'login')}/>
                                        <span className="focus-input100"></span>
                                    </div>
                                    <div className="wrap-input100 validate-input m-b-20"
                                         data-validate="Enter username or email">
                                        <input className="input100" type="email" name="username"
                                               placeholder="Логин или email"
                                               value={this.state.email}
                                               onChange={(e) => this.handleChanger(e, 'email')}/>
                                        <span className="focus-input100"></span>
                                    </div>
                                    <div className="wrap-input100 validate-input m-b-25" data-validate="Enter password">
                                        <input className="input100" type="password" name="pass" placeholder="пароль"
                                               value={this.state.password}
                                               onChange={(e) => this.handleChanger(e, 'password')}/>
                                        <span className="focus-input100"></span>
                                    </div>
                                </>
                            }
                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" onClick={(e) => {
                                    this.sendIt(e)
                                } }>
                                    {this.state.label}
                                </button>
                            </div>
                            <div className="text-center p-t-57 p-b-20">
                                <span className="txt1">  Или {this.state.label.toLowerCase()} с </span>
                            </div>
                            <div className="flex-c p-b-112">
                                <p  className="login100-social-item">
                                    <i className="fa fa-facebook-f"></i>
                                </p>
                                <p className="login100-social-item">
                                    <img src={require("../assets/images/icons/icon-google.png")} alt="GOOGLE"/>
                                </p>
                            </div>
                        </div>
                        <div className="text-center">
                            <Link to="#" className="txt2 hov1" onClick={(e,c) => {
                                e.preventDefault()
                                if (this.state.islogin) {
                                    c = false
                                } else {
                                    c = true
                                }
                                this.setState({
                                    islogin: c,
                                    label: (c) ? "Войти" : 'Зарегистроваться'})
                            }}>
                                {(this.state.label === "Войти")?  'Зарегистроваться' : "Войти" }
                            </Link>
                        </div>
                    </form>

                    <div id="dropDownSelect1"></div>
                </div>
            </div>
        );
    }
}


export default Register;
