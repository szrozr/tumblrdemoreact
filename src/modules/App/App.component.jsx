import React, { PureComponent } from 'react';
import { Switch, Route } from "react-router-dom";

import MainPage from '../pages/MainPage';

class App extends PureComponent {
    render () {
        return (
            <Switch>
                <Route exact path="/" component={MainPage} />
            </Switch>
        );
    }
}

export default App;
