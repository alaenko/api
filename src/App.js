import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ServiceList from './components/ServiceList';
import ServiceEdit from './components/ServiceEdit';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/services" component={ServiceList} />
        <Route path="/services/:id" component={ServiceEdit} />
        <Route exact path="/"><Redirect to="/services" /></Route>/>
      </Switch>
    </Router>
  );
}

export default App;

