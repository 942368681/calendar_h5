import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Switch, DatePicker, Picker, Toast } from 'antd-mobile';
import { moli } from '../../common/js/common';
import addStyle from './add.css';

class Add extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    };
    goBack = () => {
        if (this.props.location.state) {
            this.props.history.replace({
                pathname: '/detail',
                state: { id: this.props.location.state.id }
            })
        } else {
            this.props.history.goBack();
        }
    };
    complete = () => {
        if (this.props.addState.textVal == "") {
            Toast.info('请输入日程主题', 1.5);
            return;
        }
        let self = this;
        if (this.props.location.state) {
            /* 调用修改日程接口 */
            let param = {
                "id": this.props.location.state.id,
                "title": this.props.addState.textVal,
                "remark": this.props.addState.remarkVal,
                "wholeDay": this.props.addState.checked ? 1 : 0,
                "remindType": this.props.addState.remindData,
                "repeatType": this.props.addState.repeatData,
                "startDate": this.props.addState.dateStartShow.replace(/[\u4e00-\u9fa5]/g, '-').substr(0, this.props.addState.dateStartShow.replace(/[\u4e00-\u9fa5]/g, '-').length-1),
                "endDate": this.props.addState.dateEndShow.replace(/[\u4e00-\u9fa5]/g, '-').substr(0, this.props.addState.dateEndShow.replace(/[\u4e00-\u9fa5]/g, '-').length-1),
                "startTime": this.props.addState.timeStartShow,
                "endTime": this.props.addState.timeEndShow
            };
            moli.ajaxRequest({
                type: 'post',
                url: 'schedule/update',
                loadingTxt: '',
                param: param
            }, (res) => {
                if (res.flag == 0) {
                    Toast.success('日程修改成功', 1, () => { self.goBack() });
                    // 修改本地数据
                    self.props.datas.forEach((e) => {
                        if (e.id == self.props.location.state.id) {
                            e.endDate = self.props.addState.dateEndShow.replace(/[\u4e00-\u9fa5]/g, '-').substr(0, self.props.addState.dateEndShow.replace(/[\u4e00-\u9fa5]/g, '-').length-1);
                            e.startDate = self.props.addState.dateStartShow.replace(/[\u4e00-\u9fa5]/g, '-').substr(0, self.props.addState.dateStartShow.replace(/[\u4e00-\u9fa5]/g, '-').length-1);
                            e.remark = self.props.addState.remarkVal;
                            e.remindType = self.props.addState.remindData;
                            e.repeatType = self.props.addState.repeatData;
                            e.title = self.props.addState.textVal;
                            e.endTime = self.props.addState.timeEndShow;
                            e.startTime = self.props.addState.timeStartShow;
                            e.wholeDay = self.props.addState.checked ? 1 : 0;
                        }
                    });
                    self.props.getData(self.props.datas);
                    // 重新查询日程
                    self.props.refreshData(true);
                } else {
                    Toast.offline('日程修改失败', 1);
                }
            }, (err) => {
                Toast.offline('日程修改失败', 1);
                console.log(err);
            });
        } else {
            /* 调用添加日程接口 */
            console.log(this.props.addState);
            let param = {
                "title": this.props.addState.textVal,
                "remark": this.props.addState.remarkVal,
                "wholeDay": this.props.addState.checked ? 1 : 0,
                "remindType": this.props.addState.remindData,
                "repeatType": this.props.addState.repeatData,
                "startDate": this.props.addState.dateStartShow.replace(/[\u4e00-\u9fa5]/g, '-').substr(0, this.props.addState.dateStartShow.replace(/[\u4e00-\u9fa5]/g, '-').length-1),
                "endDate": this.props.addState.dateEndShow.replace(/[\u4e00-\u9fa5]/g, '-').substr(0, this.props.addState.dateEndShow.replace(/[\u4e00-\u9fa5]/g, '-').length-1),
                "startTime": this.props.addState.timeStartShow,
                "endTime": this.props.addState.timeEndShow
            };
            moli.ajaxRequest({
                type: 'post',
                url: 'schedule/create',
                loadingTxt: '',
                param: param
            }, (res) => {
                if (res.flag == 0) {
                    Toast.success('添加成功', 1, () => { self.goBack() });
                    // 重新查询日程
                    self.props.refreshData(true);
                } else {
                    Toast.offline('添加失败', 1);
                }
            }, (err) => {
                Toast.offline('添加失败', 1);
                console.log(err);
            });
        }
    };
    textInput = (type) => {
        let ev = event || window.event;
        if (type == "content") {
            this.props.changeAddPage({...this.props.addState, textVal: this.textVal.value});
        } else {
            this.props.changeAddPage({...this.props.addState, remarkVal: this.remarkVal.value});
        }
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
                        { this.props.location.state ? "编辑日程" : "添加日程" }
                    </NavBar>
                </div>
                <div className={ addStyle.content }>
                    <textarea 
                        ref = { elem => this.textVal = elem }
                        placeholder="请输入日程内容" 
                        onChange={ this.textInput.bind(this, 'content') } 
                        value={ this.props.addState.textVal }
                    ></textarea>
                    <div className={ addStyle.allDay }>
                        <span>全天</span>
                        <span>
                            <Switch
                                checked={ this.props.addState.checked }
                                onClick={ () => {this.props.changeAddPage({
                                    ...this.props.addState, 
                                    checked: !this.props.addState.checked,
                                    remindData: 1,
                                    repeatData: 0
                                })} }
                            />
                        </span>
                    </div>
                    <div className={ addStyle.datePicker }>
                        <DatePicker
                            value={ this.props.addState.dateStart }
                            onChange={ (date) => {this.props.changeAddPage({...this.props.addState, dateStart: date})} }
                        >
                            <div>
                                <p>开始</p>
                                <p>{ this.props.addState.dateStartShow }</p>
                                <p>{ this.props.addState.timeStartShow }</p>
                            </div>
                        </DatePicker>
                        <DatePicker
                            value={ this.props.addState.dateEnd }
                            onChange={ (date) => {this.props.changeAddPage({...this.props.addState, dateEnd: date})} }
                        >
                            <div>
                                <p>结束</p>
                                <p>{ this.props.addState.dateEndShow }</p>
                                <p>{ this.props.addState.timeEndShow }</p>
                            </div>
                        </DatePicker>
                    </div>
                </div>
                <div className={ addStyle.toastPicker }>
                    <div>
                        <div>提醒</div>
                        <Picker
                            data={ this.props.remindData }
                            cols={1}
                            value={ [this.props.addState.remindData] }
                            onOk={ (index) => {
                                this.props.changeAddPage({
                                    ...this.props.addState, 
                                    remindData: index[0]})
                                } 
                            }
                        >
                            <div className={ addStyle.toastPickerR }>
                                <span>{ this.props.remindData[this.props.addState.remindData].label }</span>
                                <i className="iconfont icon-enter"></i>
                            </div>
                        </Picker>
                    </div>
                    <div>
                        <div>重复</div>
                        <Picker
                            data={ this.props.repeatData }
                            cols={1}
                            value={ [this.props.addState.repeatData] }
                            onOk={ (index) => {
                                this.props.changeAddPage({
                                    ...this.props.addState, 
                                    repeatData: index[0]})
                                } 
                            }
                        >
                            <div className={ addStyle.toastPickerR }>
                                <span>{ this.props.repeatData[this.props.addState.repeatData].label }</span>
                                <i className="iconfont icon-enter"></i>
                            </div>
                        </Picker>
                    </div>
                </div>
                <textarea 
                    className={ addStyle.remarkCon } 
                    placeholder="添加备注"
                    ref = { elem => this.remarkVal = elem }
                    onChange={ this.textInput.bind(this, 'remark') } 
                    value={ this.props.addState.remarkVal }
                ></textarea>
            </div>
        );
    };
};

export default Add;