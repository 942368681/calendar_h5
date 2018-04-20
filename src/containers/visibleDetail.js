import { connect } from 'react-redux';
import { changeVisible, changeAddPage } from '../actions';
import Detail from '../components/detail/detail';

const mapStateToProps = (state, ownProps) => ({
    datas: state.datas.filter(e => e.todoID == ownProps.location.state.id),
    visible: state.visible
});
const mapDispatchToProps = dispatch => ({
    changeVisible: visible => dispatch(changeVisible(visible)),
    changeAddPage: addState => dispatch(changeAddPage(addState))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);