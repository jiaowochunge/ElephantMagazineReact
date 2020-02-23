import React from 'react'
import {
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Post from 'app/Post'

export default class PostList extends React.Component {

  render() {
    return (
      <div>
        <h2>post list page</h2>
        <ul>
          <li>
            <Link to={`/post/111`}>post 1</Link>
          </li>
          <li>
            <Link to={`/post/222`}>post 2</Link>
          </li>
          <li>
            <Link to={`/post/333`}>post 3</Link>
          </li>
        </ul>

        <Switch>
          <Route path={`/post/:postId`}>
            <Post />
          </Route>
        </Switch>
      </div>
    )
  }

}
