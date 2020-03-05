import React, { useState, useEffect } from 'react'

import { useParams, useHistory } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import Zoom from '@material-ui/core/Zoom'

import ArrowBack from '@material-ui/icons/ArrowBack'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import ShareIcon from '@material-ui/icons/Share'

import useScrollTrigger from '@material-ui/core/useScrollTrigger'

import { makeStyles } from '@material-ui/core/styles'

import copyRight from 'assets/img/copyright.png'
import reqPath from 'assets/sample-article.json'
import 'assets/css/base.css'

import { formatDate } from 'app/simpleUtil'

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2)
  },
  innerContainer: {
    padding: 0
  },
  zoom: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  foot: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  footDivider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

function HideOnScroll(props) {
  const trigger = useScrollTrigger({target: document.querySelector('#app')})

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {props.children}
    </Slide>
  )
}

function ScrollTop(props) {
  const classes = useStyles()

  const trigger = useScrollTrigger({
    target: document.querySelector('#app'),
    disableHysteresis: true,
    threshold: 500
  })

  const handleClick = event => {
    const anchor = document.querySelector('#back-to-top-anchor')

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role='presentation' className={classes.zoom}>
        {props.children}
      </div>
    </Zoom>
  )
}

export default function Post(props) {

  const classes = useStyles()

  const history = useHistory()
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  useEffect(() => {
    // FIXME: 使用的本地模拟数据
    fetch(reqPath)
      .then(res => res.json())
      .then(result => {
        if (result.head.code == 0) {
          setPost(result.body.article)
        } else {
          alert(result.head.message)
        }
      }, error => {
        alert(error)
      })
  })

  const loadingView = (
    <div>
      <CircularProgress />
      <Typography>loading...</Typography>
    </div>
  )

  const postView = (
    post ?
    <>
      <Typography variant='h6'>{post.title}</Typography>
      <Typography variant='caption'>{post.author}</Typography>
      <div className='article-body' dangerouslySetInnerHTML={{__html: post.content}}/>
    </> : null
  )

  return (
    <Container className={classes.container}>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <IconButton edge='start' color='inherit' aria-label='back'
              onClick={e => history.goBack()}
            >
              <ArrowBack />
            </IconButton>
            <Typography style={{flexGrow: 1}}></Typography>
            <IconButton edge='end' color='inherit' aria-label='share'
            >
              <ShareIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id='back-to-top-anchor'/>
      <Container className={classes.innerContainer}>
      {
        post ? postView : loadingView
      }
      </Container>
      <ScrollTop {...props}>
        <Fab color='secondary' size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <div>
      {
        post ? (
          <div className={classes.foot}>
            <Typography variant='caption' color='textSecondary'>
              {formatDate(1000 * post['create_time'])}
            </Typography>
            <Typography variant='caption' color='textSecondary'>
              阅读量：{post['read_num']}
            </Typography>
          </div>
        ) : null
      }
        <Divider light className={classes.footDivider}/>
        <img src={copyRight} alt='copy right' />
      </div>
    </Container>
  )
}
