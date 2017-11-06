import * as Koa from 'koa'
import * as KoaStatic from 'koa-static'
// import KoaProxy from 'koa-proxy'
import * as convert from 'koa-convert'
import * as webpack from 'webpack'
import webpackConfig from './webpack.client'
import * as historyApiFallback from 'koa-connect-history-api-fallback'
import * as path from 'path'
import * as fs from 'fs'
import _debug from 'debug'
import configs from '../../configs'
import webpackDevMiddleware from '../middleware/webpack-dev'
import webpackHMRMiddleware from '../middleware/webpack-hmr'
import compressHandlerMiddleware from '../middleware/compress-handler'

const debug = _debug('app:server');
const app = new Koa();

// app.use(compressHandlerMiddleware.register(true));

app.use(convert(historyApiFallback({
  verbose: false
})));


const compiler = webpack(webpackConfig);

// Enable webpack-dev and webpack-hot middleware
const { publicPath } = webpackConfig.output;

app.use(webpackDevMiddleware(compiler, publicPath));
// app.use(webpackHMRMiddleware(compiler));



// Serve static assets from ~/src/static since Webpack is unaware of
// these files. This middleware doesn't need to be enabled outside
// of development since this directory will be copied into ~/dist
// when the application is compiled.
app.use(convert(KoaStatic(path.join(__dirname, '..', '..', 'src', 'public'))));

export default app