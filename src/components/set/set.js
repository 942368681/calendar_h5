import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar } from 'antd-mobile';
import setStyle from './set.css';

class Set extends Component {
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
                        设置
                    </NavBar>
                    <i className={`${setStyle.icon} iconfont icon-enter`}></i>
                </div>
            </div>
        );
    };
};

export default Set;
