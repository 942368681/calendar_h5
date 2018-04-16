import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Switch, DatePicker } from 'antd-mobile';
import addStyle from './add.css';

class Add extends Component {
    constructor() {
        super();
        this.state = {
            textVal: "",
            checked: false,
            dateStart: new Date(),
            dateEnd: new Date()
        };
    };
    goBack = () => {
        this.props.history.goBack();
    };
    complete = () => {
        /* 调用添加日程接口 */
        this.goBack();
    };
    textInput = () => {
        let ev = event || window.event;
        this.setState({
            textVal: ev.target.value
        });
    };
    render() {
        return (
            <div>
                <div className="navBar">
                    <NavBar
                        mode="dark"
                        leftContent={[<span key="0" className="iconfont icon-back"></span>]}
                        rightContent={[<span key="1" className={ addStyle.complete } onClick={ this.complete }>完成</span>]}
                        onLeftClick = { this.goBack }
                    >
                        添加日程
                    </NavBar>
                </div>
                <div className={ addStyle.content }>
                    <textarea placeholder="请输入日程内容" onChange={ this.textInput } value={ this.state.textVal }></textarea>
                    <div className={ addStyle.allDay }>
                        <span>全天</span>
                        <span>
                            <Switch
                                checked={ this.state.checked }
                                onClick={ () => {this.setState({checked: !this.state.checked})} }
                            />
                        </span>
                    </div>
                    <div className={ addStyle.datePicker }>
                        <DatePicker
                            value={ this.state.dateStart }
                            onChange={ date => this.setState({ dateStart: date }) }
                        >
                            <div>
                                <p>开始</p>
                                <p></p>
                            </div>
                        </DatePicker>
                        <DatePicker
                            value={ this.state.dateStart }
                            onChange={ date => this.setState({ dateStart: date }) }
                        >
                            <div>
                                <p>结束</p>
                                <p></p>
                            </div>
                        </DatePicker>
                    </div>
                </div>
            </div>
        );
    };
};

export default Add;