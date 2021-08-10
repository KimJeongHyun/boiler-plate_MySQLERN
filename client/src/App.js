import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  HashRouter
} from "react-router-dom"

import Auth from './hoc/auth'
import Forbidden from './components/views/ErrorPage/Forbidden'
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import Logout from './components/views/User/Logout'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Board from './components/views/Board/Board'
import Post from './components/views/Board/Post'
import FileDownload from './components/views/Board/FileDownload'
import BoardFiltered from './components/views/Board/BoardFiltered'
import PostRecom from './components/views/Board/PostRecom'
import PostRecomDel from './components/views/Board/PostRecomDel'
import PostWrite from './components/views/Board/PostWrite'
import PostDelete from './components/views/Board/PostDelete'
import ProfileUser from './components/views/User/ProfileUser'
import ProfileUserEdit from './components/views/User/ProfileUserEdit'


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
          {/* <Route exact path="/" component={LandingPage}
            null -> all access
            true -> only login users
            false -> only guests
          */}
          <Route exact path="/" component={Auth(LandingPage)}/>
          <Route path="/authError" component={Forbidden}/>
          <Route path="/login" component={Auth(LoginPage,false)}/>
          <Route path="/register" component={Auth(RegisterPage,false)}/>
          <Route path="/logout" component={Auth(Logout,true)}/>
          <Route path="/board/list/:idx" component={Auth(Board)}/>
          <Route path="/post/:idx" component={Auth(Post)}/>
          <Route path="/fileDownload/:idx/:name" component={Auth(FileDownload)}/>
          <Route path="/board/filtered/:filter/:text" component={Auth(BoardFiltered)}/>
          <Route path="/recommend/:idx" component={Auth(PostRecom,true)}/>
          <Route path="/recommendDel/:idx" component={Auth(PostRecomDel,true)}/>
          <Route path="/write/:idx" component={Auth(PostWrite,true)}/>
          <Route path="/delete/:idx" component={Auth(PostDelete,true)}/>
          <Route path="/myProfile" component={Auth(ProfileUser,true)}/>
          <Route path="/myProfileEdit" component={Auth(ProfileUserEdit,true)}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App
