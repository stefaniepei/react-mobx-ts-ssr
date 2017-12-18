/* tslint:disable */
import * as path from 'path'
import * as webpack from 'webpack'
import * as fs from 'fs-extra'
import serverConfig from './webpack.server'
import clientConfig from '../client/webpack.client'
import configs from '../../configs'

import * as _debug from 'debug'
const debug = _debug('app:server:compile')

const inRoot = path.resolve.bind(path, configs.pathBase)

const webpackCompiler = (config: any, statsFormat?: any) => {
  return new Promise((resolve: any, reject: any) => {
    const compiler = webpack(config)
    compiler.run((err: any, stats: any) => {
      const jsonStats = stats.toJson()
      debug('Webpack compile completed.')
      // debug(stats.toString(statsFormat));

      if (err) {
        debug('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      } else if (jsonStats.errors.length > 0) {
        debug('Webpack compiler encountered errors.')
        debug(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
        debug('Webpack compiler encountered warnings.')
        debug(jsonStats.warnings.join('\n'))
      } else {
        debug('No errors or warnings encountered.')
      }
      resolve(jsonStats)
    })
  })
}

(async function () {
  try {
    debug('Run compiler')
    const clientStats: any = await webpackCompiler(clientConfig)
    if (clientStats.warnings.length) {
      debug('Client Config set to fail on warning, exiting with status code "1".')
      process.exit(1)
    }
    debug('Copy client static assets to dist folder.')

    const serverStats: any = await webpackCompiler(serverConfig)
    if (serverStats.warnings.length) {
      debug('Server Config set to fail on warning, exiting with status code "1".')
      process.exit(1)
    }
    debug('Server Copy static assets to dist folder.')
    fs.copySync(
      configs.assetsDir, configs.outDir
    )
    debug('Compiler Success !!!')
  } catch (e) {
    debug('Compiler encountered an error.', e)
    process.exit(1)
  }
})()
