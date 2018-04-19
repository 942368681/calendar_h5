import { connect } from 'react-redux';
import { getCalendar, getData } from '../actions';
import Calendar from '../components/homePage/calendar/calendar';

const mapStateToProps = state => ({
    calendar: state.calendar,
    datas: state.datas
});
const mapDispatchToProps = dispatch => ({
    getCalendar: (calendarArr, dateNow) => dispatch(getCalendar(calendarArr, dateNow)),
    getData: dataArr => dispatch(getData(dataArr))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar);