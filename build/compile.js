import fs from 'fs-extra'
import path from 'path'
import webpack from 'webpack'
import webpackConfig from './server/webpack.server'
import configs from '../configs'
import _debug from 'debug'
const debug = _debug('app:server:compile')

const runWebpackCompiler = (webpackConfig) =>
  new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)
    compiler.run((err, stats) => {
      if (err) {
        debug('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      }
      const jsonStats = stats.toJson()
      if (jsonStats.errors.length > 0) {
        debug('Webpack compiler encountered errors.')
        debug(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
        debug('Webpack compiler encountered warnings.')
        debug(jsonStats.warnings.join('\n'))
      }else{
        debug('No errors or warnings encountered.')
      }
      resolve(stats)
    })
  })

const compile = () => Promise.resolve()
  .then(() => debug('Starting compiler...'))
  .then(() => runWebpackCompiler(webpackConfig))
  .then((stats) => {
    debug(`Copying static assets from ./public to ./${configs.outDir}.`)
    fs.copySync(
      path.resolve(configs.pathSrc, 'public'),
      path.resolve(configs.pathBase, configs.outDir),
    )
    return stats
  })
  .then((stats) => {
    debug(`Compiler finished successfully! See ./${configs.outDir}.`)
  })
  .catch((err) => debug('Compiler encountered errors.', err))

compile()
