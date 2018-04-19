import { connect } from 'react-redux';
import { getData } from '../actions';
import Detail from '../components/detail/detail';

const mapStateToProps = state => ({
    datas: state.datas
});
const mapDispatchToProps = dispatch => ({
    getData: dataArr => dispatch(getData(dataArr))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);