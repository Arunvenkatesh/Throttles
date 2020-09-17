import React from 'react';
import './App.css';

import Home from "./components/Home"
import Details from "./components/Details"
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
const browserHistory = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <BrowserRouter history={browserHistory}>
        <Route path="/" component={Home} >
          <Redirect to="/Home" />
          <Route path="/Home" component={Home} />
          <Route path="/details" component={Details} />
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
