import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Switch, DatePicker, Picker } from 'antd-mobile';
import addStyle from './add.css';

class Add extends Component {
    constructor() {
        super();
        this.state = {
            
        };
        this.remindData = [
            { value: 0, label: "无" },
            { value: 1, label: "日程开始时" },
            { value: 2, label: "提前五分钟" },
            { value: 3, label: "提前15分钟" },
            { value: 4, label: "提前30分钟" },
            { value: 5, label: "提前1小时" },
            { value: 6, label: "提前1天" }
        ];
        this.repeatData = [
            { value: 0, label: "不重复" },
            { value: 1, label: "每天" },
            { value: 2, label: "每周" },
            { value: 3, label: "每两周" },
            { value: 4, label: "每月" },
            { value: 5, label: "每年" }
        ];
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
        /* 调用添加日程接口 */
        console.log(this.props.addState);
        this.goBack();
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
                                onClick={ () => {this.props.changeAddPage({...this.props.addState, checked: !this.props.addState.checked})} }
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
                            data={ this.remindData }
                            cols={1}
                            value={ [this.props.addState.remindData.value] }
                            onOk={ (index) => {
                                this.props.changeAddPage({
                                    ...this.props.addState, 
                                    remindData: this.remindData[index]})
                                } 
                            }
                        >
                            <div className={ addStyle.toastPickerR }>
                                <span>{ this.props.addState.remindData.label }</span>
                                <i className="iconfont icon-enter"></i>
                            </div>
                        </Picker>
                    </div>
                    <div>
                        <div>重复</div>
                        <Picker
                            data={ this.repeatData }
                            cols={1}
                            value={ [this.props.addState.repeatData.value] }
                            onOk={ (index) => {
                                this.props.changeAddPage({
                                    ...this.props.addState, 
                                    repeatData: this.repeatData[index]})
                                } 
                            }
                        >
                            <div className={ addStyle.toastPickerR }>
                                <span>{ this.props.addState.repeatData.label }</span>
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