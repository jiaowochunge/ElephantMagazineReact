import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Setting from 'app/Setting'
import PostList from 'app/PostList'
import Post from 'app/Post'

export default class Home extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Link to="/setting">Setting</Link>
          content
        </div>
        <Switch>
          <Route path='/setting' component={Setting} />
          <Route path='/posts' component={PostList} />
          <Route path='/post/:postId' component={Post} />
          <Route exact path='/' component={PostList} />
        </Switch>
      </Router>
    )
  }

}
