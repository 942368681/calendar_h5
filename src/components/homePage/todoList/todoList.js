import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
        let { todoData } = nextProps;
        let arr = [];
        todoData.forEach((e, i) => {
            arr.push(
                <li key={ i } className={ todoListStyle.listItem }>
                    <div className={ todoListStyle.listItemL }>
                        <span className="iconfont icon-richenganpai"></span>
                    </div>
                    <div className={ todoListStyle.listItemR }>
                        <p>sddfweofaosjdaskdmkaslflsdfsldasd</p>
                        <p>开会开会开会</p>
                    </div>
                </li>
            )
        });
        this.listArr = arr;
    };
    render() {
        return (
            <div id = "todoList" className={ todoListStyle.content }>
                <ul className={ todoListStyle.list }>
                    { this.listArr }
                </ul>
	        </div>
        );
    };
};

export default TodoList;