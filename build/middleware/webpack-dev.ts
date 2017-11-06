import * as WebpackDevMiddleware from 'webpack-dev-middleware'
import * as path from 'path'
import _debug from 'debug'
import configs from '../../configs'

const debug = _debug('app:server:webpack-dev');

export default function(compiler: any, publicPath: any) {
  debug('Enable webpack dev middleware.');

  const middleware = WebpackDevMiddleware(compiler, {
    publicPath,
    contentBase: path.join(__dirname, '..', '..', 'src'),
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    stats: false
  });

  return async function koaWebpackDevMiddleware (ctx: any, next: any) {
    let hasNext = await applyExpressMiddleware(middleware, ctx.req, {
      end: (content: any) => (ctx.body = content),
      setHeader: function () {
        ctx.set.apply(ctx, arguments)
      }
    });

    if (hasNext) {
      await next()
    }
  }
}

function applyExpressMiddleware (fn: any, req: any, res: any) {
  const originalEnd = res.end;

  return new Promise((resolve) => {
    res.end = function () {
      originalEnd.apply(this, arguments);
      resolve(false)
    };
    fn(req, res, function () {
      resolve(true)
    })
  })
}
