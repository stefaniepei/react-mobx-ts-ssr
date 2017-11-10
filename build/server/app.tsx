// declare function require(moduleName: string): any
import * as express from 'express'
import * as path from 'path'
import * as React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import configs from '../../configs/index'
import { CookiesProvider } from 'react-cookie'
import * as cookiesMiddleware from 'universal-cookie-express'

import * as middleware from './middleware/index'

import Provider from '../../src/Provider'
import {stores} from '../../src/Provider'

let app = express()

app.use(middleware.morgan)
app.use(middleware.session)
app.use(middleware.compression)
app.use(cookiesMiddleware())

app.set('view engine', 'ejs')
app.set('views', 'src')

// app.use(express.static('public'))
app.use(express.static('dist'))

app.get('*', (req:any, res) => {
  const context = {
    url:'',
    status:0,
  }
  // stores.Base.count = +req.universalCookies.get('count') || 0
  stores.Base.set(+req.universalCookies.get('count'))
  const initialState = JSON.stringify(stores)

  console.log(initialState,req.universalCookies)

  const initialView = renderToString(
    <StaticRouter location={ req.url } context= { context } >
      <CookiesProvider cookies={req.universalCookies}>
        <Provider />
      </CookiesProvider>
    </StaticRouter>
  )

  if (context.url) {
    res.redirect(context.url, context.status)
  } else {
    if (context.status) {
      res.status(context.status)
    }

    res.render('index', { initialView, initialState })
  }
})

export default app
