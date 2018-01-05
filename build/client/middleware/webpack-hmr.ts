import * as WebpackHotMiddleware from 'webpack-hot-middleware'
import * as _debug from 'debug'

const debug = _debug('app:server:webpack-hmr')

export default (compiler: any, opts?: any) => {
  debug('Enable Webpack Hot Module Replacement (HMR).')

  const middleware = WebpackHotMiddleware(compiler, opts)
  return async function koaWebpackHMR(ctx: any, next: any) {
    let hasNext = await applyExpressMiddleware(middleware, ctx.req, ctx.res)

    if (hasNext && next) {
      await next()
    }
  }
}

function applyExpressMiddleware(fn: any, req: any, res: any) {
  const originalEnd = res.end

  return new Promise((resolve) => {
    res.end = function() {
      originalEnd.apply(this, arguments)
      resolve(false)
    }
    fn(req, res, function() {
      resolve(true)
    })
  })
}
