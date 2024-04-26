import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ActorsList from './views/ActorsList';
import ActorDetail from './components/ActorCard/ActorCard';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ActorsList} />
        <Route path="/actor/:id" component={ActorDetail} />
      </Switch>
    </Router>
  );
}

export default App;
