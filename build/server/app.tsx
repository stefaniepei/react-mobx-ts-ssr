// declare function require(moduleName: string): any
import * as express from 'express'
import * as path from 'path'
import * as React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import configs from '../../configs/index'

const inRoot = path.resolve.bind(path, configs.pathBase)
const inRootSrc = (file) => inRoot(configs.pathBase, file)
import * as middleware from './middleware/index'

import Provider from '../../src/Provider'
import {stores} from '../../src/Provider'

// import App from '../../src/containers/App'
// import createStore from '../../src/store/createStore'
// const stores = createStore()

let app = express()

app.use(middleware.morgan)
app.use(middleware.session)
app.use(middleware.compression)

app.set('view engine', 'ejs')
app.set('views', 'src')

// app.use(express.static('public'))
app.use(express.static('dist'))

app.get('*', (req, res) => {
  const context = {
    url:'',
    status:0,
  }

  const initialState = JSON.stringify(stores)

  console.log(initialState)

  const initialView = renderToString(
    <StaticRouter location={ req.url } context= { context } >
      <Provider />
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
