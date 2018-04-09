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
import calendarStyle from './calendar/calendar.css';

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            todoList: []
        };
        this.calendarBox = null;
        this.daysActive = null;
        this.dateList = null;
        this.todoList = null;
        this.disY = null;
    };
    componentDidMount = () => {
        this.getTodoList();
        this.calendarBox = document.getElementsByClassName(calendarStyle.content)[0];
        this.daysActive = document.getElementsByClassName(calendarStyle.daysActive)[0];
        this.dateList = document.getElementsByClassName(calendarStyle.dateList)[0];
        this.todoList = document.getElementById('todoList');
        window.addEventListener('scroll',this.onScroll);
    };
    onScroll = () => {
        if (document.body.scrollTop >= 60 || document.documentElement.scrollTop >= 60) {
            this.daysActive = document.getElementsByClassName(calendarStyle.daysActive)[0];
            this.calendarBox.style.position = "fixed";
            this.calendarBox.style.top = -0.32 + "rem";
            this.dateList.style.top = -this.daysActive.offsetTop + "px";
            this.dateList.style.height = this.daysActive.clientHeight + this.daysActive.offsetTop + "px";
            this.calendarBox.style.height = 2.6 + "rem";
            this.todoList.style.position = "fixed";
            this.todoList.style.top = this.calendarBox.clientHeight + "px";
            this.todoList.style.maxHeight = 9 + "rem";
            this.todoList.style.overflowY = "auto"; 
            this.todoList.addEventListener('touchstart', this.todoListTouch);
        };
    };
    todoListTouch = () => {
        let ev = event || window.event;
        if (ev.touches.length == 1) {
            this.disY = ev.touches[0].pageY;
            this.todoList.addEventListener('touchmove', this.todoListMove);
        }
    };
    todoListMove = () => {
        if (document.getElementById('todoList').scrollTop <= 0) {
            let ev = event || window.event;
            if(ev.touches[0].pageY - this.disY > 100) {
                this.calendarBox.removeAttribute('style');
                this.dateList.removeAttribute('style');
                this.dateList.removeAttribute('style');
                this.calendarBox.removeAttribute('style');
                this.todoList.removeAttribute('style');
                this.todoList.removeAttribute('style');
                this.todoList.removeAttribute('style');
                this.todoList.removeAttribute('style');
                this.todoList.removeEventListener('touchstart', this.todoListTouch);
                this.todoList.removeEventListener('touchmove', this.todoListMove);
            }
        }
    }; 
    getTodoList = () => {
        let self = this;
        axios.get('http://data/todoList')
        .then((response) => {
            self.setState({
                todoList: response.data.list
            });
        })
        .catch((error) => {
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