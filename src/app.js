import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';

import './common/js/common.js';
import './common/fonts/iconfont.css';
import './common/css/main.css';

import HomePage from './components/homePage/homePage.js';
import Add from './components/add/add.js';
import Set from './components/set/set.js';
import Search from './components/search/search.js';


class App extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    };
    render() {
        return (
            <Router>
                <div>
                    <Route exact path = "/" component = { HomePage }></Route>
                    <Route path = "/add" component = { Add }></Route>
                    <Route path = "/set" component = { Set }></Route>
                    <Route path = "/search" component = { Search }></Route>
                </div>
            </Router>
        );
    };
};
ReactDOM.render(<App />, document.getElementById('root'));