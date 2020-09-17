import React from "react";
import { Route, Switch, Router, Redirect } from "react-router";

import Home from "./components/Home"
import Details from "./components/Details"
// import { BrowserRouter, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
const browserHistory = createBrowserHistory();

export default (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" component={Home} >
                <Redirect to="/home" />
            </Route>
            <Route path="/details" component={Details} />
        </Switch>
    </Router>
);