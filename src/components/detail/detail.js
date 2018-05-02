import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Popover, Modal } from 'antd-mobile';
import { appendZero } from '../../common/js/common';
import detailStyle from './detail.css';

const Item = Popover.Item;
const alert = Modal.alert;

class Detail extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    };
    goBack = () => {
        this.props.history.goBack();
    };
    onSelect = (opt) => {
        this.props.changeVisible(false);
        if (opt.props.value == "delete") {
            alert('确认删除该日程？', '', [
                { text: '取消' },
                { text: '确认', onPress: () => this.goBack(), style:{ color: "#F44336" } }
            ])
            /* 在此调用删除日程接口，并返回当月修改后的所有数据，存入store */
        } else {
            let { textVal, startDate, endDate, remind, repeat, remarkVal, timeStart, timeEnd } = this.props.datas[0];
            let prevAddState = {
                textVal,
                checked: /周/.test(timeStart),
                dateStart: new Date(startDate.split('-')[0], Number(startDate.split('-')[1])-1, startDate.split('-')[2], /周/.test(timeStart) ? "00" : appendZero(timeStart.split(':')[0]), /周/.test(timeStart) ? "00" : appendZero(timeStart.split(':')[1])),
                dateEnd: new Date(endDate.split('-')[0], Number(endDate.split('-')[1])-1, endDate.split('-')[2], /周/.test(timeEnd) ? "00" : appendZero(timeEnd.split(':')[0]), /周/.test(timeEnd) ? "00" : appendZero(timeEnd.split(':')[1])),
                remindData: remind,
                repeatData: repeat,
                remarkVal: remarkVal
            };
            this.props.changeAddPage(prevAddState);
            this.props.history.replace({
                pathname: '/add',
                state: { 
                    id: this.props.location.state.id,
                    prevDatas: this.props.datas
                }
            });
        }
    };
    render() {
        let [oData] = this.props.datas;
        return (
            <div>
                <div className="navBar">
                    <NavBar
                        mode="dark"
                        leftContent={[<span key="0" className="iconfont icon-back"></span>]}
                        rightContent={
                            <Popover
                                visible={ this.props.visible }
                                style={{ color: '#F44336' }}
                                overlayStyle={{ color: '#F44336' }}
                                contextStyle={{ color: '#F44336' }}
                                triggerStyle={{ color: '#F44336' }} 
                                overlay={[
                                    (<Item key="0" value="change"><i className="iconfont icon-send_blog"></i> 编辑</Item>),
                                    (<Item key="1" value="delete"><i className="iconfont icon-delete"></i> 删除</Item>)
                                ]}
                                onSelect={this.onSelect}
                            >
                                <span key="0" className="iconfont icon-more"></span>
                            </Popover>
                        }
                        onLeftClick = { this.goBack }
                    >
                        日程详情
                    </NavBar>
                </div>
                <div className={ detailStyle.content }>
                    <ul className={ detailStyle.list }>
                        <li>
                            <span>主题：</span>
                            <span>{ oData.textVal }</span>
                        </li>
                        <li>
                            <span>创建人：</span>
                            <span>{ oData.creater }</span>
                        </li>
                        <li>
                            <span>时间：</span>
                            <span>{ oData.startDate + ' ' + oData.timeStart } 至 { oData.endDate + ' ' + oData.timeEnd }</span>
                        </li>
                        <li>
                            <span>备注：</span>
                            <span>{ oData.remarkVal }</span>
                        </li>
                        <li>
                            <span>提醒：</span>
                            <span>{ oData.remind.label }</span>
                        </li>
                        <li>
                            <span>重复：</span>
                            <span>{ oData.repeat.label }</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    };
};

export default Detail;