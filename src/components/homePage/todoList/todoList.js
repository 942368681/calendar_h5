import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { SwipeAction, Toast, Modal } from 'antd-mobile';
import { moli } from '../../../common/js/common';
import todoListStyle from './todoList.css';

const alert = Modal.alert;

class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            
        };
        this.listArr = [];
    };
    componentWillReceiveProps = (nextProps) => {
        this.init(nextProps);
    };
    init = (nextProps) => {
        let { datas } = nextProps;
        let arr = [];
        datas.forEach((e, i) => {
            arr.push(
                <SwipeAction
                    key={ i }
                    autoClose
                    right={[
                        {
                            text: '删除',
                            onPress: this.delete.bind(null, e.id),
                            style: { backgroundColor: '#F4333C', color: 'white', padding: '0 0.2rem' },
                        }
                    ]}
                >
                    <li className={ todoListStyle.listItem }>
                        <Link to={{
                            pathname: '/detail',
                            state: { id: e.id }
                        }}>
                            <div className={ todoListStyle.listItemL }>
                                <span className="iconfont icon-richenganpai"></span>
                            </div>
                            <div className={ todoListStyle.listItemR }>
                                <p>{ e.startDate + ' ' + e.startTime + ' - ' + e.endDate + ' ' + e.endTime }</p>
                                <p>{ e.title }</p>
                            </div>
                        </Link>
                    </li>
                </SwipeAction>
            )
        });
        this.listArr = arr;
    };
    delete = (id) => {
        alert('确认删除该日程？', '', [
            { text: '取消' },
            { text: '确认', onPress: () => this.confirmDelete(id), style:{ color: "#F44336" } }
        ]);
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
                Toast.success('删除成功', 1);
                // 成功后删除本地store数据
                let dataArr = self.props.allDatas.filter(e => e.id != id);
                self.props.getData(dataArr);
            } else {
                Toast.offline('删除失败', 1);
            }
        }, (err) => {
            Toast.offline('删除失败', 1);
            console.log(err);
        });
    };
    render() {
        let domElem = this.listArr.length ? 
        (
            <ul className={ todoListStyle.list }>
                { this.listArr }
            </ul>
        ) : 
        (
            <div className={ todoListStyle.empty }>
                <img src={ require("../../../common/img/empty.png") } />
                <p>暂时没有日程哦</p>
            </div>
        );

        return (
            <div id = "todoList" className={ todoListStyle.content }>
                { domElem }
	        </div>
        );
    };
};

export default TodoList;