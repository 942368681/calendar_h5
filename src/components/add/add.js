import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar } from 'antd-mobile';
import addStyle from './add.css';

class Add extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    };
    goBack = () => {
        this.props.history.goBack();
    };
    render() {
        return (
            <div>
                <div className="navBar">
                    <NavBar
                        mode="dark"
                        leftContent={[<span key="0" className="iconfont icon-back"></span>]}
                        onLeftClick = { this.goBack }
                    >
                        添加日程
                    </NavBar>
                </div>
            </div>
        );
    };
};

export default Add;