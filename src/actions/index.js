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
