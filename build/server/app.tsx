import express from 'express'
import path from 'path'

import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'

import middleware from './middleware'

import App from '../src/containers/App'

let app = express()

app.use(middleware.morgan)
app.use(middleware.session)
app.use(middleware.compression)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.resolve(__dirname, '../dist')))

app.get('*', (req, res: any) => {
  const context = {
    url:'',
    status:'',
  }

  const initialState = {}

  const initialView = renderToString((
    <StaticRouter location={ req.url } context= { context } >
      <App />
    </StaticRouter>
  ))
console.log(initialState)

  if (context.url) {
    res.redirect(context.url, context.status)
  } else {
    if (context.status) {
      res.status(context.status)
    }

    res.render('index', { initialView, initialState })
  }
})

module.exports = app
