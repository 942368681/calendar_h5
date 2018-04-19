import { appendZero } from '../common/js/common';

const initialState = {
    dateChoosed: "",
    datas: [],
    calendar: [],
    addState: {
        textVal: "",
        checked: false,
        dateStart: new Date(),
        dateEnd: new Date(),
        remindData: { value: 1, label: "日程开始时" },
        repeatData: { value: 0, label: "不重复" },
        remarkVal: ""
    }
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
                dateChoosed: action.dateNow
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

        default:
            return state;
    }
}

export default reducer;