import React from 'react'
import {
  Link
} from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'

import SettingsIcon from '@material-ui/icons/Settings'

import { makeStyles } from '@material-ui/core/styles'

import PostList from 'app/PostList'

import logo from 'assets/img/logo-w.png'

const useStyles = makeStyles(theme => ({
  container: {
    padding: 0
  },
  logo: {
    height: theme.spacing(6),
    margin: 'auto'
  }
}))

export default function Home() {
  const classes = useStyles()

  return (
    <Container className={classes.container}>
      <AppBar>
        <Toolbar>
          <Link to='/setting' style={{color: 'inherit'}}>
            <IconButton edge='start' color='inherit'>
              <SettingsIcon />
            </IconButton>
          </Link>
          <img src={logo} alt='logo' className={classes.logo} />
          <IconButton edge='end'>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <PostList />
    </Container>
  )
}
