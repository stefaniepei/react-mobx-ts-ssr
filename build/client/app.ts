import * as Koa from 'koa'
import * as KoaStatic from 'koa-static'
import * as convert from 'koa-convert'
import * as webpack from 'webpack'
import * as historyApiFallback from 'koa-connect-history-api-fallback'
import * as path from 'path'
import * as fs from 'fs-extra'
import * as _debug from 'debug'
import configs from '../../configs'
import webpackDevMiddleware from './middleware/webpack-dev'
import webpackHMRMiddleware from './middleware/webpack-hmr'
import webpackConfig from './webpack.client'
// import compressHandlerMiddleware from './middleware/compress-handler'

const debug = _debug('app:server')
const app = new Koa()
const __DEV__ = process.env.NODE_ENV === 'development'

// app.use(compressHandlerMiddleware.register(true))

app.use(convert(historyApiFallback({
  verbose: false,
})))


if (__DEV__) {
  // Enable webpack-dev and webpack-hot middleware
  const compiler = webpack(webpackConfig as any)
  const { publicPath } = webpackConfig.output
  app.use(webpackDevMiddleware(compiler, publicPath))
  app.use(webpackHMRMiddleware(compiler))
}

// Serve static assets from ~/src/static since Webpack is unaware of
// these files. This middleware doesn't need to be enabled outside
// of development since this directory will be copied into ~/dist
// when the application is compiled.
app.use(convert(KoaStatic(path.join(__dirname, '..', '..', 'assets'))))

export default app
