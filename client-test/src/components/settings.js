import React, {Component} from "react";




class Settings extends Component{



    render() {
        return (
            <div className="chat-block ">
                <div className="left-block-c col-12 p-0 m-0">
                    <div className="header d-flex justify-content-between">
                        <p className="title-room">BoJack Horseman</p>
                        <div className="setting-room">
                            <button className="btn btn-danger ">Bj H</button>
                        </div>
                    </div>
                    <div className="chat-board ">
                        <ul className='overflow-auto'>
                            <li className="from">
                                <p>Hey chat me from 1</p>
                            </li>
                            <li className="to">
                                <p>Hey chat me from 3</p>
                            </li>
                            <li className="from">
                                <p>Hey chat me from 2</p>
                            </li>
                            <li className="from">
                                <p>Hey chat me from 3</p>
                            </li>
                            <li className="from">
                                <p>Hey chat me from 4</p>
                            </li>
                            <li className="to">
                                <p>Hey chat me from 1</p>
                            </li>
                            <li className="to">
                                <p>Hey chat me from 2</p>
                            </li>
                            <li className="from">
                                <p>Hey chat me from 1</p>
                            </li>
                            <li className="to">
                                <p>Hey chat me from 3</p>
                            </li>
                            <li className="from">
                                <p>Hey chat me from 2</p>
                            </li>
                            <li className="from">
                                <p>Hey chat me from 3</p>
                            </li>
                            <li className="from">
                                <p>Hey chat me from 4</p>
                            </li>
                            <li className="to">
                                <p>Hey chat me from 1</p>
                            </li>
                            <li className="to">
                                <p>Hey chat me from 2</p>
                            </li>
                            <li className="from">
                                <p>Hey chat me from 1</p>
                            </li>
                            <li className="to">
                                <p>Hey chat me from 3</p>
                            </li>
                            <li className="from">
                                <p>Hey chat me from 2</p>
                            </li>
                            <li className="from">
                                <p>Hey chat me from 3</p>
                            </li>
                            <li className="from">
                                <p>Hey chat me from 4</p>
                            </li>
                            <li className="to">
                                <p>Hey chat me from 1</p>
                            </li>
                            <li className="to">
                                <p>Hey chat me from 2</p>
                            </li>

                            <li className="to">
                                <p>Hey chat me from 4</p>
                            </li>
                        </ul>
                    </div>
                    <div className="pen-panel pos-absolute bottom-0 col-12">
                        <div className="form-group d-flex justify-content-between m-0 mb-1">
                                            <textarea name="" id="" cols="20" rows="1"
                                                      className="form-control col-10"
                                                      placeholder={'Сообщение...'}></textarea>
                            <button className="btn  send">Отправить</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export {
    Settings
}
