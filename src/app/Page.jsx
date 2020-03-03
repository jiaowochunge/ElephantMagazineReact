import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    left: 0,
    top: 0,
    margin: 0,
    padding: 0,
    color: 'white',
  }
})

export default function Page(props) {
  const classes = useStyles()

  return <div className={classes.root}>{props.children}</div>
}
