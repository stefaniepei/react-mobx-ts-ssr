import * as express from 'express'
import * as React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'

import middleware from './middleware'
import Provider from '../../src/Provider'
import { stores } from '../../src/Provider'


let app = express()

app.use(middleware.compression)

app.set('view engine', 'ejs')
app.set('views', 'src')

// app.use(express.static('public'))
app.use(express.static('dist'))
app.use('/favicon.ico', express.static(__dirname + '../../favicon.ico'))

app.get('*', (req: any, res) => {
  const context: any = {}
  const initialState = JSON.stringify(stores)

  // console.log(initialState)

  const initialView = renderToString(
    <StaticRouter location={req.url} context={context} >
      <Provider />
    </StaticRouter>,
  )
  const helmet = Helmet.renderStatic()
  const initialTitle = helmet.title.toString()
  const initialMeta = helmet.meta.toString()
  res.render('index', { initialView, initialState, initialTitle, initialMeta })
})

export default app
