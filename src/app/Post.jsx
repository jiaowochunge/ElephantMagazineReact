import React from 'react'

export default class Post extends React.Component {

  render() {
    let { params } = this.props.match

    return <div>post { params.postId }</div>
  }

}
