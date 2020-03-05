import React, { useState, useEffect } from 'react'
import {
  Switch,
  Route,
  Link
} from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'

import Post from 'app/Post'
import PostListItem from 'app/PostListItem'

import reqPath from 'assets/sample-article-list.json'

const useStyles = makeStyles(theme => ({
  container: {
    padding: 0,
    //backgroundColor: theme.palette.background.default
  },
}))

export default function PostList() {
  const classes = useStyles()

  const [refresh, setRefresh] = useState(true)
  const [listData, setListData] = useState([])
  useEffect(() => {
    if (refresh) {
      // FIXME: 使用的本地模拟数据
      fetch(reqPath)
        .then(res => res.json())
        .then(result => {
          if (result.head.code == 0) {
            setListData(result.body.article)
          } else {
            alert(result.head.message)
          }
        }, error => {
          alert(error)
        })

      setRefresh(false)
    }
  })

  return (
    <Container className={classes.container}>
      {
        listData.map((data, index) => (
          <Link to={`/post/${data.id}`} key={index}>
            <PostListItem post={data} />
            <Divider />
          </Link>
        ))
      }
      <Switch>
        <Route path={`/post/:postId`}>
          <Post />
        </Route>
      </Switch>
    </Container>
  )
}
