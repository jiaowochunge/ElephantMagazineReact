import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red, orange } from '@material-ui/core/colors'
import GradeIcon from '@material-ui/icons/Grade'

import { formatDate } from 'app/simpleUtil'

const useStyles = makeStyles(theme => ({
  head: {
    paddingBottom: theme.spacing(1),
  },
  headAction: {
    marginTop: 0,
    marginRight: 0
  },
  content: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  avatar: {
    backgroundColor: red[500],
  },
  actions: {
    justifyContent: 'space-between',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  }
}))

export default function PostListItem(props) {
  const { post, ...others } = props
  const classes = useStyles()

  const [fav, setFav] = useState(false)
  useEffect(() => {
    // FIXME: 模拟查询
    setTimeout(() => {
      Math.random() > 0.8 ? setFav(true) : setFav(false)
    }, 100)
  })

  return (
    <Card elevation={0}>
      <CardHeader
        classes={{root: classes.head, action: classes.headAction}}
        avatar={
          <Avatar variant='square' alt='题图' src={post.headpic} className={classes.avatar} />
        }
        action={
          fav ? <GradeIcon style={{ color: orange[300] }} /> : null
        }
        title={post.title}
        subheader={post.author}
      />
      <CardContent className={classes.content}>
        <Typography variant='body2' color='textSecondary' component='p'>
          {post.brief}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Typography variant='caption' color='textSecondary'>
          {formatDate(1000 * post['create_time'])}
        </Typography>
        <Typography variant='caption' color='textSecondary'>
          阅读量：{post['read_num']}
        </Typography>
      </CardActions>
    </Card>
  )
}
