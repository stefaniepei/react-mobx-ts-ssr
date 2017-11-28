import * as Koa from 'koa'
import * as KoaStatic from 'koa-static'
import * as convert from 'koa-convert'
import * as EjsRender from 'koa-ejs'
import * as historyApiFallback from 'koa-connect-history-api-fallback'
import * as path from 'path'
import * as _debug from 'debug'
import * as React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'

import configs from '../../configs'

const debug = _debug('app:server:koa')

import Provider from '../../src/Provider'
import { stores } from '../../src/Provider'

let app = new Koa()

app.use(convert(historyApiFallback({
  verbose: false,
})))

debug(configs.proName)

EjsRender(app, {
  root: path.join(__dirname, configs.proName + '/src'),
  layout: 'index',
  viewExt: 'ejs',
  cache: false,
  debug: false,
})

app.use(convert(KoaStatic('dist')))
// app.use('/favicon.ico', convert(KoaStatic(__dirname + '../../favicon.ico')))

app.use(async(ctx, next) => {
  const { originalUrl } = ctx
  try {
    const context: any = {}
    const initialState = JSON.stringify(stores)
    // console.log(initialState)
    const initialView = renderToString(
      <StaticRouter location={originalUrl} context={context} >
        <Provider />
      </StaticRouter>,
    )
    const helmet = Helmet.renderStatic()
    const initialTitle = helmet.title.toString()
    const initialMeta = helmet.meta.toString()
    await ctx.render('index', { initialView, initialState, initialTitle, initialMeta })
  } catch (e) {
    ctx.body = e.message
  }
  next && await next()
})

export default app
