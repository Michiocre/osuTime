import React from 'react';
import ReactDOM from 'react-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={Login} />
            <Route path="/main/*" component={Main} />
        </div>
    </Router>

);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
