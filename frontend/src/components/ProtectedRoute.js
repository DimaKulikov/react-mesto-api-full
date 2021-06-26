import React from 'react'
import { Redirect, Route } from 'react-router'

const ProtectedRoute = ({children,loggedIn, ...rest}) => {
  return (
    <Route {...rest} render={() => {
      return loggedIn
      ? children
      : <Redirect to='/login' />
    }} />
  )
}

export default ProtectedRoute