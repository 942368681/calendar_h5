import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Popover, Modal, Toast } from 'antd-mobile';
import { appendZero, moli } from '../../common/js/common';
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
    /* Popover操作 */
    onSelect = (opt) => {
        this.props.changeVisible(false);
        if (opt.props.value == "delete") {
            /* 点选删除 */
            alert('确认删除该日程？', '', [
                { text: '取消' },
                { text: '确认', onPress: () => this.confirmDelete(this.props.location.state.id), style:{ color: "#F44336" } }
            ])
        } else {
            /* 点选编辑，跳转编辑日程页面 */
            let { title, startDate, endDate, remindType, repeatType, remark, startTime, endTime } = this.props.oData;
            let prevAddState = {
                textVal: title,
                checked: /周/.test(startTime),
                dateStart: new Date(startDate.split('-')[0], Number(startDate.split('-')[1])-1, startDate.split('-')[2], /周/.test(startTime) ? "00" : appendZero(startTime.split(':')[0]), /周/.test(startTime) ? "00" : appendZero(startTime.split(':')[1])),
                dateEnd: new Date(endDate.split('-')[0], Number(endDate.split('-')[1])-1, endDate.split('-')[2], /周/.test(endTime) ? "00" : appendZero(endTime.split(':')[0]), /周/.test(endTime) ? "00" : appendZero(endTime.split(':')[1])),
                remindData: remindType,
                repeatData: repeatType,
                remarkVal: remark
            };
            this.props.changeAddPage(prevAddState);
            this.props.history.replace({
                pathname: '/add',
                state: { 
                    id: this.props.location.state.id
                }
            });
        }
    };
    confirmDelete = (id) => {
        console.log('要删除的此条日程的ID： '+ id);
        let self = this;
        let param = {
            "scheduleId": id
        };
        moli.ajaxRequest({
            type: 'post',
            url: 'schedule/delete',
            loadingTxt: '删除中...',
            param: param
        }, (res) => {
            if (res.flag == 0) {
                Toast.success('删除成功', 1, () => { 
                    self.props.history.replace({
                        pathname: '/'
                    });
                    // 成功后删除本地store数据
                    let dataArr = self.props.allDatas.filter(e => e.id != id);
                    self.props.getData(dataArr);
                });
            } else {
                Toast.offline('删除失败', 1);
            }
        }, (err) => {
            Toast.offline('删除失败', 1);
            console.log(err);
        });
    };
    render() {
        let oData = this.props.oData;
        return (
            <div>
                <div className="navBar">
                    <NavBar
                        mode="dark"
                        leftContent={[<span key="0" className="iconfont icon-back"></span>]}
                        rightContent={
                            <Popover
                                visible={ this.props.visible }
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
                            <span>{ oData.title }</span>
                        </li>
                        <li>
                            <span>创建人：</span>
                            <span>{ oData.creater }</span>
                        </li>
                        <li>
                            <span>时间：</span>
                            <span>{ oData.startDate + ' ' + oData.startTime } 至 { oData.endDate + ' ' + oData.endTime }</span>
                        </li>
                        <li>
                            <span>备注：</span>
                            <span>{ oData.remark }</span>
                        </li>
                        <li>
                            <span>提醒：</span>
                            <span>{ this.props.remindData[oData.remindType].label }</span>
                        </li>
                        <li>
                            <span>重复：</span>
                            <span>{ this.props.repeatData[oData.repeatType].label }</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    };
};

export default Detail;