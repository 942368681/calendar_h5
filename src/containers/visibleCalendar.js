import { connect } from 'react-redux';
import { getCalendar, getData, changeMonthIndex, refreshData } from '../actions';
import Calendar from '../components/homePage/calendar/calendar';

const mapStateToProps = state => ({
    calendar: state.calendar,
    datas: state.datas,
    monthIndex: state.monthIndex,
    refresh: state.refresh
});

const mapDispatchToProps = dispatch => ({
    getCalendar: (calendarArr, dateNow) => dispatch(getCalendar(calendarArr, dateNow)),
    getData: dataArr => dispatch(getData(dataArr)),
    changeMonthIndex: rangeNum => dispatch(changeMonthIndex(rangeNum)),
    refreshData: bool => dispatch(refreshData(bool))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar);