import React from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

// css for app
import 'assets/css/app.css'

import Home from 'app/Home'
import Setting from 'app/Setting'
import PostList from 'app/PostList'
import Post from 'app/Post'
import UserExperience from 'app/UserExperience'
import AboutDeveloper from 'app/AboutDeveloper'
import CustomDialog from 'app/CustomDialog'

// render to DOM
ReactDOM.render(
  <Router>
    <Switch>
      <Route path='/setting/user-experience' component={UserExperience} />
      <Route path='/setting/about-developer' component={AboutDeveloper} />
      <Route path='/setting' component={Setting} />
      <Route path='/posts' component={Home} />
      <Route path='/post/:postId' component={Post} />
      <Route exact path='/' component={Home} />
    </Switch>
    <CustomDialog />
  </Router>,
  document.getElementById('app')
)
