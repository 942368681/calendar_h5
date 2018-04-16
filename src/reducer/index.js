const initialState = {
    datas: [],
    calendar: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DATAS':
            return {
                ...state,
                datas: action.dataArr
            };
        case 'GET_CALENDAR':
            return {
                ...state,
                calendar: action.calendarArr
            };
        default:
            return state;
    }
}

export default reducer;