import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { SwipeAction, Toast } from 'antd-mobile';
import axios from 'axios';
import todoListStyle from './todoList.css';

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
                            text: '取消',
                            style: { backgroundColor: '#ddd', color: 'white', padding: '0 0.2rem' },
                        },
                        {
                            text: '删除',
                            onPress: this.delete,
                            style: { backgroundColor: '#F4333C', color: 'white', padding: '0 0.2rem' },
                        }
                    ]}
                >
                    <li className={ todoListStyle.listItem }>
                        <Link to={{
                            pathname: '/detail',
                            state: { id: e.todoID }
                        }}>
                            <div className={ todoListStyle.listItemL }>
                                <span className="iconfont icon-richenganpai"></span>
                            </div>
                            <div className={ todoListStyle.listItemR }>
                                <p>{ e.startDate + ' ' + e.timeStart + ' - ' + e.endDate + ' ' + e.timeEnd }</p>
                                <p>{ e.textVal }</p>
                            </div>
                        </Link>
                    </li>
                </SwipeAction>
            )
        });
        this.listArr = arr;
    };
    getTodoList = () => {
        let self = this;
        Toast.loading('Loading...', 5, () => {
            Toast.offline('请求超时', 1);
        });
        axios.get('http://data/todoList')
        .then((response) => {
            Toast.hide();
            self.props.getData(response.data.list);
        })
        .catch((error) => {
            console.log(error);
        });
    };
    delete = () => {
        this.getTodoList();
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