import React, { useState, useEffect } from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'

import CloseIcon from '@material-ui/icons/Close'

import { makeStyles } from '@material-ui/core/styles'


export default function CustomDialog() {
  return (
    <div>
      <UseSnackbar />
      <UseAlertDialog />
    </div>
  )
}

function UseSnackbar() {
  const [state, setState] = useState({open: false, msg: null})

  useEffect(() => {
    window.snackbar = (msg) => {
      setState({
        open: true,
        msg: msg
      })
    }
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setState({
      open: false,
      msg: null
    })
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={state.open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={state.msg}
      action={
        <>
          <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
            <CloseIcon fontSize='small' />
          </IconButton>
        </>
      }
    />
  )
}

const alertStyles = makeStyles(theme => ({
  root: {
    minWidth: '200px',
  },
}))

function UseAlertDialog() {
  const classes = alertStyles()
  const [state, setState] = useState({open: false, msg: null, confirm: null, option: {}});

  useEffect(() => {
    // 保存原始函数
    window.originAlert = window.alert
    /**
     * @param msg 消息体
     * @param callback 按钮回调
     * @param option 设置标题，按钮文字等
     */
    window.alert = (msg, callback, option) => {
      setState({
        open: true,
        msg: msg,
        confirm: callback,
        option: option || {}
      })
    }
  }, [])

  const handleClose = () => {
    if (typeof state.confirm == 'function') {
      state.confirm.apply(null)
    }
    setState({
      open: false,
      msg: null,
      confirm: null,
      option: {}
    })
  }

  return (
    <Dialog
      open={state.open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
    {
      state.option.title ? <DialogTitle id='alert-dialog-title'>{state.option.title}</DialogTitle> : null
    }
      <DialogContent className={classes.root}>
        <DialogContentText id='alert-dialog-description'>
          {state.msg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          {state.option.ok || 'OK'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
