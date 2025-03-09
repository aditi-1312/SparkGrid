import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import FloatingMap from 'components/FloatingMap';
import Admin from './Admin';
import Protected from './Protected';
import MarketplacePage from 'pages/MarketplacePage';
import GenerateEnergyPage from 'pages/GenerateEnergyPage';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/authenticate/sign-in" component={Admin} />
          <Route path="/authenticate/sign-up" component={Admin} />
          <Protected exact path="/dashboard" component={Admin} />
          <Protected exact path="/tables" component={Admin} />
          <Protected exact path="/billing" component={Admin} />
          <Protected exact path="/profile" component={Admin} />
          <Protected exact path="/marketplace" component={Admin} />
          <Protected exact path="/blockchain" component={Admin} />
          <Protected exact path="/generated" component={Admin} />
          <Redirect from="*" to="/" />
        </Switch>
        <FloatingMap />
      </div>
    </Router>
  );
}

export default App;