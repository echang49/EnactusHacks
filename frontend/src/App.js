import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
 } from 'react-router-dom';
import Home from "./components/home.jsx";
import Newjob from "./components/employer/newjob.jsx";
import Results from "./components/applicant/results.jsx";
import Application from "./components/applicant/application.jsx";
import EmpApplication from "./components/employer/empapplication.jsx";

class App extends React.Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/newJob">
              <Newjob />
            </Route>
            <Route exact path="/results">
              <Results />
            </Route>
            <Route exact path="/application">  
              <Application />
            </Route>
            <Route exact path="/empapplication">
              <EmpApplication />
            </Route>
          </Switch>
        </Router>
      
    );
  }
}

export default App;