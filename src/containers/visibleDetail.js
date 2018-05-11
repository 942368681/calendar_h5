import { connect } from 'react-redux';
import { changeVisible, changeAddPage, getData } from '../actions';
import Detail from '../components/detail/detail';

const filterData = (datas, ownProps) => datas.filter(e => e.id == ownProps.location.state.id)[0];

const mapStateToProps = (state, ownProps) => ({
    allDatas: state.datas,
    oData: filterData(state.datas, ownProps),
    visible: state.visible,
    remindData: filterData(state.datas, ownProps).wholeDay ? state.remindData.allDay : state.remindData.normal,
    repeatData: state.repeatData
});
const mapDispatchToProps = dispatch => ({
    changeVisible: visible => dispatch(changeVisible(visible)),
    changeAddPage: addState => dispatch(changeAddPage(addState)),
    getData: dataArr => dispatch(getData(dataArr))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);