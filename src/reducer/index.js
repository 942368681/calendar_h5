import { appendZero } from '../common/js/common';

const initialState = {
    monthIndex: 0,
    dateChoosed: "",
    datas: [],
    calendar: [],
    // 是否刷重新查询日程数据
    refresh: false,
    // 添加日程页面所用状态
    addState: {
        textVal: "",
        // 是否勾选全天
        checked: false,
        dateStart: new Date(),
        dateEnd: new Date(),
        remindData: 1,
        repeatData: 0,
        remarkVal: ""
    },
    // 控制详情页面Popover显隐（默认隐藏）
    visible: false,
    remindData: {
        normal: [
            { value: 0, label: "无" },
            { value: 1, label: "日程开始时" },
            { value: 2, label: "提前五分钟" },
            { value: 3, label: "提前15分钟" },
            { value: 4, label: "提前30分钟" },
            { value: 5, label: "提前1小时" },
            { value: 6, label: "提前1天" }
        ],
        allDay: [
            { value: 0, label: "无" },
            { value: 1, label: "当天8点" },
            { value: 2, label: "当天9点" },
            { value: 3, label: "当天10点" },
            { value: 4, label: "提前一天8点" },
            { value: 5, label: "提前一天9点" },
            { value: 6, label: "提前一天10点" }
        ]
    },
    repeatData: [
        { value: 0, label: "不重复" },
        { value: 1, label: "每天" },
        { value: 2, label: "每周" },
        { value: 3, label: "每月" },
        { value: 4, label: "每年" }
    ]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DATAS':
            return {
                ...state,
                datas: action.dataArr
            };

        case 'GET_CALENDAR':
            let nextState = {
                ...state,
                calendar: action.calendarArr,
                dateChoosed: action.dateNow,
                addState: initialState.addState
            };
            let arr = action.dateNow.split('-');
            nextState.addState.dateStart = new Date(arr[0], Number(arr[1])-1, arr[2], appendZero(new Date().getHours()), appendZero(new Date().getMinutes()));
            nextState.addState.dateEnd = new Date(arr[0], Number(arr[1])-1, arr[2], appendZero(new Date().getHours()+1), appendZero(new Date().getMinutes()));
            return nextState;

        case 'CHANGE_ADD':
            return {
                ...state,
                addState: action.addState
            };
        
        case 'CHANGE_VISIBLE':
            return {
                ...state,
                visible: action.visible
            };

        case 'CHANGE_MONTHINDEX':
            return {
                ...state,
                monthIndex: action.rangeNum
            };
        
        case 'REFRESH_DATA':
            return {
                ...state,
                refresh: action.bool
            }

        default:
            return state;
    }
}

export default reducer;