import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  HashRouter
} from "react-router-dom"

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import Logout from './components/views/User/Logout'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Board from './components/views/Board/Board'
import Post from './components/views/Board/Post'
import PostRecom from './components/views/Board/PostRecom'
import PostRecomDel from './components/views/Board/PostRecomDel'
import PostWrite from './components/views/Board/PostWrite'



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
          <Route path="/logout">
            <Logout/>
          </Route>
          <Route path="/board/list/:page" component={Board}/>
          <Route path="/post/:page" component={Post}/>
          <Route path="/recommend/:idx" component={PostRecom}/>
          <Route path="/recommendDel/:idx" component={PostRecomDel}/>
          <Route path='/write/:idx' component={PostWrite}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App
