import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Switch from '@material-ui/core/Switch'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import ArrowBack from '@material-ui/icons/ArrowBack'

import { makeStyles } from '@material-ui/core/styles'

import ueFile from 'file-loader!assets/smartisan_experience_plan_content_cn.html'
console.log(ueFile)
const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  card: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  cardContent: {
    padding: 0,
    flexGrow: 1
  },
  innerContent: {
    border: 'none',
    height: '100%'
  },
  cardActions: {
    justifyContent: 'space-between'
  },
  remark: {
    margin: theme.spacing(1)
  }
}))

export default function UserExperience() {
  const classes = useStyles()
  const history = useHistory()
  const [ agree, setAgree ] = useState(false)

  return (
    <Container className={classes.container}>
      <AppBar>
        <Toolbar>
          <IconButton edge='start' color='inherit'
            onClick={e => history.goBack()}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant='h6'>用户体验改进计划</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <iframe src={ueFile} className={classes.innerContent} />
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Typography>参与用户体验改进计划</Typography>
          <Switch
            checked={agree}
            onChange={e => {
              setAgree(e.target.checked)
            }}
            value='checked'
            color='primary'
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </CardActions>
      </Card>
      <Typography variant='caption' color='textSecondary' className={classes.remark} component='p'>
        为了改善产品的用户体验，大象公会将会对各个功能的使用情况进行统计，但绝不涉及用户的个人隐私数据。
      </Typography>
    </Container>
  )
}
