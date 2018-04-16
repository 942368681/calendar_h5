import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';

import rootReducer from './reducer';
import './common/js/common.js';
import './common/fonts/iconfont.css';
import './common/css/main.css';

import HomePage from './components/homePage/homePage';
import Add from './components/add/add';
import Set from './components/set/set';
import Detail from './components/detail/detail';

const store = createStore(rootReducer);

class App extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    };
    render() {
        return (
            <Provider store = { store }>
                <Router>
                    <div>
                        <Route exact path = "/" component = { HomePage }></Route>
                        <Route path = "/add" component = { Add }></Route>
                        <Route path = "/set" component = { Set }></Route>
                        <Route path = "/detail" component = { Detail }></Route>
                    </div>
                </Router>
            </Provider>
        );
    };
};
ReactDOM.render(<App />, document.getElementById('root'));