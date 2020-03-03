import React from 'react'
import {
  Link
} from 'react-router-dom'

import PostList from 'app/PostList'

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <Link to="/setting">Setting</Link>
        <PostList />
      </div>
    )
  }

}
