import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import App from './modules/App';
import data from './modules/assets/data';
// import { Route, BrowserRouter as Router } from 'react-router-dom';

// import App from './modules/App';
import './modules/styles/index.style.scss';

class Main extends React.Component {
    render () {
        console.log('data: ', data[0]);
        return (
            <Router>
                <Route strict path="/" component={App} />
            </Router>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('app'));
