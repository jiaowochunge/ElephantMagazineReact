import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Slide from '@material-ui/core/Slide'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'

import ArrowBack from '@material-ui/icons/ArrowBack'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  body: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default
  },
  blockTitle: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(2)
  },
  block: {
  },
  blockList: {
    padding: 0
  }
}))

const useListItemStyles = makeStyles(theme => ({
  secondaryAction: {
    paddingRight: theme.spacing(4)
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  secondaryActionRoot: {
    right: theme.spacing(1)
  }
}))

const listItems = [
  {
    blockTitle: null,
    block: [
      {
        title: '文章字号',
        subTitle: '小',
        action: defaultItemClickAction,
        hasIcon: true
      },
      {
        title: '检查更新',
        subTitle: 'v2.1.1',
        action: defaultItemClickAction,
        hasIcon: false
      },
      {
        title: '清除缓存',
        subTitle: '0.0MB',
        action: defaultItemClickAction,
        hasIcon: false
      }
    ]
  },
  {
    blockTitle: '联系我们',
    block: [
      {
        title: '微信公众号',
        subTitle: 'idxgh2013',
        action: defaultItemClickAction,
        hasIcon: false
      },
      {
        title: '新浪微博',
        subTitle: '@大象公会',
        action: defaultItemClickAction,
        hasIcon: false
      },
      {
        title: '电子邮件',
        subTitle: 'bd@idaxiang.org',
        action: defaultItemClickAction,
        hasIcon: false
      }
    ]
  },
  {
    blockTitle: '其他',
    block: [
      {
        title: '分享大象公会应用',
        subTitle: null,
        action: defaultItemClickAction,
        hasIcon: false
      },
      {
        title: '分享大象公会微信公众号',
        subTitle: null,
        action: defaultItemClickAction,
        hasIcon: false
      },
      {
        title: '给大象公会报选题',
        subTitle: null,
        action: defaultItemClickAction,
        hasIcon: true
      },
      {
        title: '用户体验改进计划',
        subTitle: null,
        action: function() {
          this.history.push('/setting/user-experience')
        },
        hasIcon: true
      },
      {
        title: '关于开发者',
        subTitle: null,
        action: defaultItemClickAction,
        hasIcon: true
      }
    ]
  }
]

function defaultItemClickAction() {
  alert('not complete')
}

export default function Setting(props) {

  const classes = useStyles()
  const history = useHistory()
  const itemClasses = useListItemStyles()

  const ctx = {
    history
  }

  return (
    <Container className={classes.body}>
      <HideOnScrollAppBar/>
      <Toolbar />
      {
        listItems.map((block, blockIndex) => (
          <div key={blockIndex}>
            {
              block.blockTitle ? (
                <Typography variant='body2' color='textSecondary' className={classes.blockTitle}>
                  {block.blockTitle}
                </Typography>
              ) : null
            }
            <Paper className={classes.block}>
              <List classes={{padding: classes.blockList}}>
              {
                block.block.map((item, index, array) => (
                  <ListItem divider={array.length - index > 1} onClick={item.action.bind(ctx)} key={index} classes={{secondaryAction: itemClasses.secondaryAction}}>
                    <ListItemText
                      primary={item.title}
                      secondary={item.subTitle}
                      classes={{root: itemClasses.text}}
                    />
                    {
                      item.hasIcon ? (
                        <ListItemSecondaryAction classes={{root: itemClasses.secondaryActionRoot}}>
                          <IconButton edge='end'>
                            <ChevronRightIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      ) : null
                    }
                  </ListItem>
                ))
              }
              </List>
            </Paper>
          </div>
        ))
      }
    </Container>
  )

}


function HideOnScrollAppBar(props) {
  const history = useHistory()

  // warning: `document.querySelector('#app')` 改成更合理的方式
  const trigger = useScrollTrigger({target: document.querySelector('#app')})

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      <div>
        <AppBar>
          <Toolbar>
            <IconButton edge='start' color='inherit' aria-label='back'
              onClick={e => history.goBack()}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant='h6'>
              设置
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </Slide>
  )
}
