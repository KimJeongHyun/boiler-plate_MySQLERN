import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom"

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Board from './components/views/Board/Board'
import Logout from './components/views/User/Logout'


function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          {/* <Route exact path="/" component={LandingPage} */}
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/board/list/">
            <Board/>
          </Route>
          <Route path="/board/list/:page">
            <Board/>
          </Route>
          <Route path="/logout">
            <Logout/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
