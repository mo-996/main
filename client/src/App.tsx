import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import PageRender from './PageRender'
import Header from './components/global/Header'
import Footer from './components/global/Footer'

import { Alert } from './components/alert/Alert'

import { refreshToken } from './redux/actions/authAction'
import { getPhones } from './redux/actions/phoneAction'

import io from 'socket.io-client'

import SocketClient from './SocketClient'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPhones())
    dispatch(refreshToken())
  },[dispatch])

  useEffect(() => {
    const socket = io()
    dispatch({ type: 'SOCKET', payload: socket })
    return () => { socket.close() }
  },[dispatch])

  return (
    <div className="container">
      <SocketClient />
      <Router>
        <Alert />
        <Header />

        <Switch>
          <Route exact path="/" component={PageRender} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:slug" component={PageRender} />
        </Switch>

        <Footer/>
      </Router>
    </div>
  )
}

export default App

