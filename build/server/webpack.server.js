import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import nodeExternals from 'webpack-node-externals'
import ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { CheckerPlugin } from 'awesome-typescript-loader'

import _debug from 'debug'
import configs from '../../configs/index'

const inProject = path.resolve.bind(path, configs.pathBase)
const inProjectSrc = (file) => inProject(configs.pathBase, file)

const __DEV__ = process.env.NODE_ENV === 'development'
const __PROD__ = process.env.NODE_ENV === 'production'

const config = {
  name: 'server',
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  entry: {
    main: [
      inProjectSrc('src/Render.tsx')
    ]
  },
  output: {
    filename: '[name].js',
    path: inProjectSrc('dist'),
    libraryTarget: "commonjs2" // 支持其他js调用
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ],
    rules: [
    ]
  },
  plugins: [
    new webpack.DefinePlugin(Object.assign({
      'process.env': { NODE_ENV: JSON.stringify(configs.env) },
      __DEV__,
      __PROD__,
    })),
    new CheckerPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
}
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

config.plugins.push(new ForkTsCheckerNotifierWebpackPlugin({
  excludeWarnings: true
}))
config.plugins.push(new ForkTsCheckerWebpackPlugin({
  checkSyntacticErrors: true
}))

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
