import React from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';

import Dashboard from './Dashboard/Dashboard';
import CityView from './CityView/CityView';

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Route path="/" exact component={Dashboard} />
      <Route path="/city/:id" component={CityView} />
    </Router>
  );
}

export default App;
