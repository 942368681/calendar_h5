export const getData = dataArr => ({
    type: 'GET_DATAS',
    dataArr
});

export const getCalendar = (calendarArr, dateNow) => ({
    type: 'GET_CALENDAR',
    calendarArr,
    dateNow
});

export const changeAddPage = addState => ({
    type: 'CHANGE_ADD',
    addState
});

export const changeVisible = visible => ({
    type: 'CHANGE_VISIBLE',
    visible
});

export const changeMonthIndex = rangeNum => ({
    type: 'CHANGE_MONTHINDEX',
    rangeNum
});

export const refreshData = bool => ({
    type: 'REFRESH_DATA',
    bool
});
