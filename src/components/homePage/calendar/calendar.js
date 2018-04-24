import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Toast } from 'antd-mobile';
import axios from 'axios';
import { appendZero } from '../../../common/js/common';
import calendarStyle from './calendar.css';

class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            
        };
        this.dateText = "";
        this.days = null;
        this.firstDayOfWeek = null;
        this.today = null;
        this.dateline = "";
        this.datelineNow = "";
    };
    componentDidMount = () => {
        this.init(this.props.monthIndex);
    };
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.datas.length) {
            this.addMark(nextProps);
        }
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
    init = (rangeNum) => {
        this.getTodoList();
        let date = new Date();
        this.dateText = this.showTitle(date, rangeNum);
        this.days = this.getDays(date);
        this.firstDayOfWeek = this.getfirstDayOfWeek(rangeNum);
        this.today = this.getToday();
        this.dateline = date.getFullYear() + '-' + appendZero(date.getMonth()+1) + '-';
        this.datelineNow = new Date().getFullYear() + '-' + appendZero(new Date().getMonth()+1) + '-';
        this.dateline == this.datelineNow ? this.getCalendar(new Date().getDate()-1, this.dateline + new Date().getDate() ) : this.getCalendar(0, this.dateline + '01');
    };
    showTitle = (date, rangeNum) => {
        date.setMonth(date.getMonth() + rangeNum);
        return date.getFullYear() + '年' + (date.getMonth()+1) + '月';
    };
    getDays = (date) => {
        date.setDate(1);
        date.setMonth(date.getMonth()+1);
        date.setDate(0);
        return date.getDate();
    };
    getfirstDayOfWeek = (rangeNum) => {
        let date = new Date();
        date.setDate(1);
		date.setMonth(date.getMonth() + rangeNum);
        return date.getDay();
    };
    getToday = () => {
        let date = new Date();
        return date.getDate();
    };
    getCalendar = (index, dateNow) => {
        let arr = [];
        for (let i = 0; i < this.firstDayOfWeek; i++) {
            arr.push(
                <li className={ calendarStyle.days } key={ i }></li>
            );
        }
        for (let i = 0; i < this.days; i++){
			arr.push(
                <li 
                    key={ this.firstDayOfWeek + i } 
                    data-dateline={ this.dateline + appendZero(i+1) }
                    data-index={ i }
                    className={ i == index ? calendarStyle.daysActive + ' ' + calendarStyle.days : calendarStyle.days }
                    onClick={ this.chooseDay }
                >
                    <span 
                        className={ 
                            this.dateline == this.datelineNow && i != index && i == new Date().getDate()-1 ? 
                            calendarStyle.today : '' 
                        }
                    >
                        { i+1 }
                    </span>
                    <b
                        className={ calendarStyle.marks }
                        data-dateline={ this.dateline + appendZero(i+1) }
                    ></b>
                </li>
            );
        }
        this.props.getCalendar(arr, dateNow);
    };
    addMark = (nextProps) => {
        let { datas } = nextProps;
        let marksArr = document.getElementsByClassName(calendarStyle.marks);
        Array.from(marksArr).forEach((e, i) => {
            let dateline = e.dataset.dataline;
            if (datas.some((item) => { return item.dateline == this.dateline +  appendZero(i+1) })) {
                e.classList.add(calendarStyle.showIt);
            } else {
                e.classList.remove(calendarStyle.showIt);
            }
        });
    };
    changeMonth = (type) => {
        let rangeNum;
        if (type == 'prev') {
            rangeNum = this.props.monthIndex - 1;
        } else {
            rangeNum = this.props.monthIndex + 1;
        }
        this.props.changeMonthIndex(rangeNum);
        this.init(rangeNum);
    };
    chooseDay = (ev) => {
        let index = ev.currentTarget.dataset.index;
        let choosedDate = ev.currentTarget.dataset.dateline;
        this.getCalendar(index, choosedDate);
    }; 
    render() {
        return (
            <div className={ calendarStyle.content }>
                <div className={ calendarStyle.head }>
                    <div className={ calendarStyle.nav }>
                        <span className="iconfont icon-xiangzuo prev" onClick={ this.changeMonth.bind(null, 'prev') }></span>
                        <span className={ calendarStyle.dateLine }>{ this.dateText }</span>
                        <span className="iconfont icon-xiangyou next" onClick={ this.changeMonth.bind(null, 'next') }></span>
                    </div>
                    <ol className={ calendarStyle.week } ref = { (elem) => {this.ol = elem} }>
                        <li>日</li>
                        <li>一</li>
                        <li>二</li>
                        <li>三</li>
                        <li>四</li>
                        <li>五</li>
                        <li>六</li>
                    </ol>
                </div>
                <div className={ calendarStyle.dateList }>
                    { this.props.calendar }
                </div>
	        </div>
        );
    };
};

export default Calendar;