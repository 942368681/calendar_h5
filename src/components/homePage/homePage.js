import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import VisibleCalendar from '../../containers/visibleCalendar';
import VisibleTodoList from '../../containers/visibleTodoList';

import homePageStyle from './homePage.css';
import calendarStyle from './calendar/calendar.css';

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            
        };
        this.calendarBox = null;
        this.daysActive = null;
        this.dateList = null;
        this.todoList = null;
        this.disY = null;
    };
    componentDidMount = () => {
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
            this.calendarBox.style.top = 0.08 + "rem";
            this.dateList.style.top = -this.daysActive.offsetTop + "px";
            this.dateList.style.height = this.daysActive.clientHeight + this.daysActive.offsetTop + "px";
            this.calendarBox.style.height = 2.6 + "rem";
            this.todoList.style.position = "fixed";
            this.todoList.style.top = this.calendarBox.clientHeight + 20 + "px";
            this.todoList.style.height = (window.innerHeight - parseFloat(getComputedStyle(this.todoList).top)) + "px";
            this.todoList.style.overflowY = "auto"; 
            window.addEventListener('touchstart', this.windowTouch);
        };
    };
    windowTouch = () => {
        let ev = event || window.event;
        if (ev.touches.length == 1) {
            this.disY = ev.touches[0].pageY;
            window.addEventListener('touchmove', this.windowMove);
        }
    };
    windowMove = () => {
        if (this.todoList.scrollTop <= 0) {
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
                window.removeEventListener('touchstart', this.windowTouch);
                window.removeEventListener('touchmove', this.windowMove);
            }
        }
    }; 
    
    goBack = () => {
        // this.props.history.goBack();
        summer.closeWin();
    };
    render() {
        return (
            <div className={ homePageStyle.homePage }>
                <div className="navBar">
                    <NavBar
                        mode="dark"
                        leftContent={[<span key="0" className="iconfont icon-back"></span>]}
                        rightContent={[
                            <Link to='/add' key="1" data-type="add" className="iconfont icon-add"></Link>
                        ]}
                        onLeftClick = { this.goBack }
                    >
                        日程
                    </NavBar>
                </div>
                <VisibleCalendar />
                <VisibleTodoList />
            </div>
        );
    };
};

export default HomePage;