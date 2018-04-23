import { connect } from 'react-redux';
import { changeAddPage, getData } from '../actions';
import { appendZero } from '../common/js/common';
import Add from '../components/add/add';

const dateHandle = (obj) => {
    let dayArr = ["日", "一", "二", "三", "四", "五", "六"];
    let ds = obj.dateStart;
    let de = obj.dateEnd;
    return {
        ...obj,
        dateStartShow: ds.getFullYear() + '年' + appendZero((ds.getMonth() + 1)) + '月' + appendZero(ds.getDate()) + '日',
        timeStartShow: obj.checked ? "周" + dayArr[ds.getDay()] : appendZero(ds.getHours()) + ':' + appendZero(ds.getMinutes()),
        dateEndShow: de.getFullYear() + '年' + appendZero((de.getMonth() + 1)) + '月' + appendZero(de.getDate()) + '日',
        timeEndShow: obj.checked ? "周" + dayArr[de.getDay()] : appendZero(de.getHours()) + ':' + appendZero(de.getMinutes())
    };
};
const mapStateToProps = state => ({
    addState: dateHandle(state.addState),
    datas: state.datas
});
const mapDispatchToProps = dispatch => ({
    changeAddPage: addState => dispatch(changeAddPage(addState)),
    getData: dataArr => dispatch(getData(dataArr))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Add);