import { connect } from 'react-redux';
import { getData } from '../actions';
import TodoList from '../components/homePage/todoList/todoList';

const filterList = (datasArr, dateline) => {
    let result = datasArr.filter(e => e.dateline == dateline);
    return result;
};
const mapStateToProps = state => ({
    allDatas: state.datas,
    datas: filterList(state.datas, state.dateChoosed)
});
const mapDispatchToProps = dispatch => ({
    getData: dataArr => dispatch(getData(dataArr))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);