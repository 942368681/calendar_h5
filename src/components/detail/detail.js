import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar } from 'antd-mobile';
import detailStyle from './detail.css';


class Detail extends Component {
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
                        日程详情
                    </NavBar>
                </div>
            </div>
        );
    };
};

export default Detail;