import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Popover } from 'antd-mobile';
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
        let oData = this.props.datas.filter(e => e.todoID == this.props.location.state.id);
        console.log(oData);
        return (
            <div>
                <div className="navBar">
                    <NavBar
                        mode="dark"
                        leftContent={[<span key="0" className="iconfont icon-back"></span>]}
                        rightContent={[<span key="0" className="iconfont icon-more"></span>]}
                        onLeftClick = { this.goBack }
                    >
                        日程详情
                    </NavBar>
                </div>
                <div className={ detailStyle.content }>
                    <ul className={ detailStyle.list }>
                        <li>
                            <span>主题：</span>
                            <span>{ oData[0].textVal }</span>
                        </li>
                        <li>
                            <span>创建人：</span>
                            <span>{ oData[0].creater }</span>
                        </li>
                        <li>
                            <span>时间：</span>
                            <span>{ oData[0].startDate + ' ' + oData[0].timeStart } 至 { oData[0].endDate + ' ' + oData[0].timeEnd }</span>
                        </li>
                        <li>
                            <span>备注：</span>
                            <span>{ oData[0].remarkVal }</span>
                        </li>
                        <li>
                            <span>提醒：</span>
                            <span>{ oData[0].remind }</span>
                        </li>
                        <li>
                            <span>重复：</span>
                            <span>{ oData[0].repeat }</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    };
};

export default Detail;