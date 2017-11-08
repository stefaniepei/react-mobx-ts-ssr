import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import nodeExternals from 'webpack-node-externals'

import ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { CheckerPlugin } from 'awesome-typescript-loader'

import configs from '../../configs/index'

const inRoot = path.resolve.bind(path, configs.pathBase)
const inRootSrc = (file) => inRoot(configs.pathBase, file)

const __DEV__ = process.env.NODE_ENV === 'development'
const __PROD__ = process.env.NODE_ENV === 'production'
const __SSR__ = process.env.RENDER_TYPE === 'server'

const config = {
  name: 'client',
  target: 'web',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  devtool: 'source-map',
  entry: {
    main: [
      'react-hot-loader/patch',
      inRootSrc('src/Render.tsx')
      // 'E:/shinezone-generator-reactts/build/client/index.js'
      // 'babel-polyfill',
      // inRootSrc('src/Render.tsx') //run
      // inRootSrc('build/client/index.js')  //build
    ]
  },
  output: {
    filename: 'client.bundle.js',
    path: inRootSrc('dist'),
    publicPath: configs.compilerPublicPath
  },
  module: {
    loaders: [
    ],
    rules: [
    ]
  },
  plugins: [
    new webpack.DefinePlugin(Object.assign({
      'process.env': { NODE_ENV: JSON.stringify(configs.env) },
      __DEV__,
      __PROD__,
      __SSR__,
    })),
    new CheckerPlugin(),
  ]
}
// Development Tools
// ------------------------------------
if (__DEV__) {
  config.entry.main.push(
    `webpack-hot-middleware/client.js?path=/__webpack_hmr&timeout=1000&reload=true`
  )
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  )

  config.plugins.push(
    new HtmlWebpackPlugin({
      template: inRootSrc('src/index.html'),
      hash: false,
      inject: true,
      manify: {
        collapseWhitespace: true
      }
    })
  )

}

config.plugins.push(new ForkTsCheckerNotifierWebpackPlugin({
  excludeWarnings: true
}))
config.plugins.push(new ForkTsCheckerWebpackPlugin({
  checkSyntacticErrors: true
}))

config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: {
    cacheDirectory: true,
    plugins: ['transform-runtime'],
    presets: ['es2015', 'react', 'stage-0']
  }
})

config.module.rules.push({
  test: /\.ts|tsx?$/,
  enforce: 'pre',
  loader: 'awesome-typescript-loader?configFileName=tsconfig.json',
  exclude: /node_modules/
})

config.module.rules.push({
  test: /\.(scss|sass)$/,
  loader: ['style-loader', 'css-loader', 'sass-loader']
})

config.module.rules.push({
  test: /\.css$/,
  loader: ['style-loader', 'css-loader']
})




export default config
