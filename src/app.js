import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';

import rootReducer from './reducer';
import './common/js/common';
import './common/fonts/iconfont.css';
import './common/css/main.css';

import HomePage from './components/homePage/homePage';
import VisibleAdd from './containers/visibleAdd';
import VisibleDetail from './containers/visibleDetail';

const store = createStore(rootReducer);

class App extends Component {
    render() {
        return (
            <Provider store = { store }>
                <Router>
                    <div>
                        <Route exact path = "/" component = { HomePage }></Route>
                        <Route path = "/add" component = { VisibleAdd }></Route>
                        <Route path = "/detail" component = { VisibleDetail }></Route>
                    </div>
                </Router>
            </Provider>
        );
    };
};
ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}