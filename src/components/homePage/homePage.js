import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import axios from 'axios';
import '../../mock/mock.js';
import Calendar from './calendar/calendar.js';
import TodoList from './todoList/todoList.js';

import homePageStyle from './homePage.css';

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            todoList: []
        };
    };
    componentDidMount = () => {
       this.getTodoList();
    };
    getTodoList = () => {
        let self = this;
        axios.get('http://data/todoList')
        .then(function (response) {
            self.setState({
                todoList: response.data.list
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    };
    goBack = () => {
        this.props.history.goBack();
    };
    render() {
        return (
            <div className={ homePageStyle.homePage }>
                <div className="navBar">
                    <NavBar
                        mode="dark"
                        leftContent={[<span key="0" className="iconfont icon-back"></span>]}
                        rightContent={[
                            <Link to='/search' key="0" data-type="search" className="iconfont icon-search"></Link>,
                            <Link to='/add' key="1" data-type="add" className="iconfont icon-add"></Link>,
                            <Link to='/set' key="2" data-type="set" className="iconfont icon-set"></Link>
                        ]}
                        onLeftClick = { this.goBack }
                    >
                        日程
                    </NavBar>
                </div>
                <Calendar todoData = { this.state.todoList } getTodoList = { this.getTodoList } />
                <TodoList todoData = { this.state.todoList } />
            </div>
        );
    };
};

export default HomePage;