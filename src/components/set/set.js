import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar } from 'antd-mobile';
import setStyle from './set.css';

import Swiper from 'react-id-swiper';
import '../../../node_modules/react-id-swiper/src/styles/css/swiper.css';

const params = {
    loop: true
};

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
                </div>
                <i className={`${setStyle.icon} iconfont icon-enter`}>123</i>
                <div className={setStyle.swiperBox}>
                    <Swiper {...params}>
                        <div className={setStyle.oDIv}>div1</div>
                    </Swiper>
                </div>
            </div>
        );
    };
};

export default Set;
