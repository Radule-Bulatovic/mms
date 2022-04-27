import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import PageRouting from './PageRouting';
import PrivateRoute from './components/PrivateRoute';

class App extends React.Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route path='/login' component={PageRouting} />
            <PrivateRoute path='/pocetna' component={PageRouting} />
            <PrivateRoute path='/prodavnice' component={PageRouting} />
            <PrivateRoute path='/korisnikoveProdavnice' component={PageRouting} />
            <PrivateRoute path='/katalogProizvoda' component={PageRouting} />
            <PrivateRoute path='/korpa' component={PageRouting} />
            <PrivateRoute path='/finansije' component={PageRouting} />
            <PrivateRoute path='/dnevniIzvjestaj' component={PageRouting} />
            <PrivateRoute path='/anketaZaProdavnicu' component={PageRouting} />
            <PrivateRoute path='/rasporedAdmin' component={PageRouting} />
            <PrivateRoute path='/raspored' component={PageRouting} />
            <PrivateRoute path='/dnevniIzvjestajAdmin' component={PageRouting} />
            <PrivateRoute path='/dnevniIzvjestajAnketa' component={PageRouting} />
            <PrivateRoute path='/dnevniIzvjestajAnketaKomerc' component={PageRouting} />
          </Switch>
      </Router>
    )
  }
}

export default App;
