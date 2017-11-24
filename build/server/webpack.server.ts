import * as webpack from 'webpack'
import * as path from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as nodeExternals from 'webpack-node-externals'
import * as ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin'
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { CheckerPlugin } from 'awesome-typescript-loader'

import configs from '../../configs'

const inRoot = path.resolve.bind(path, configs.pathBase)
const inRootSrc = (file: any) => inRoot(configs.pathBase, file)

const __DEV__ = process.env.NODE_ENV === 'development'
const __PROD__ = process.env.NODE_ENV === 'production'
const __SSR__ = process.env.RENDER_TYPE === 'server'

const config = {
  name: 'server',
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  entry: {
    main: [
      inRootSrc('build/server/index.ts'),
    ],
    // vendor: configs.compilerVendor
  },
  output: {
    filename: 'server.bundle.js',
    path: inRootSrc('dist'),
    publicPath: configs.compilerPublicPath,
    // libraryTarget: "commonjs2" // 支持其他js调用
  },
  module: {
    loaders: [
    ],
    rules: [
    ],
  },
  plugins: [
    new webpack.DefinePlugin(Object.assign({
      'process.env': { NODE_ENV: JSON.stringify(configs.env), RENDER_TYPE: JSON.stringify(configs.render), PORT: JSON.stringify(configs.port) },
      __DEV__,
      __PROD__,
      __SSR__,
    })),
  ],
}

config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: {
    cacheDirectory: true,
    plugins: ['transform-runtime'],
    presets: ['env', 'react'],
  },
})

config.module.rules.push({
  test: /\.ts|tsx?$/,
  enforce: 'pre',
  loader: 'awesome-typescript-loader?configFileName=tsconfig.json',
  exclude: /node_modules/,
})

config.module.rules.push({
  test: /\.css$/,
  use: [
    { loader: 'css-loader' },
  ],
})

config.module.rules.push({
  test: /\.(scss|sass)$/,
  use: [
    { loader: 'css-loader' },
    { loader: 'sass-loader' },
  ],
})

config.module.rules.push({
  test: /\.(png|jpg|gif|svg)$/,
  use: ['file-loader?limit=8192&name=files/[md5:hash:base64:10].[ext]'],
})

config.module.rules.push({
  test: /\.(eot|ttf|otf|woff|woff2)$/,
  use: ['file-loader?limit=10000&name=files/[md5:hash:base64:10].[ext]'],
})

config.plugins.push(
  new CheckerPlugin(),
  new ForkTsCheckerNotifierWebpackPlugin({
    excludeWarnings: true,
  }),
  new ForkTsCheckerWebpackPlugin({
    checkSyntacticErrors: true,
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),
)
if (__PROD__) {
  config.plugins.push(
    // new ExtractTextPlugin({
    //     filename: 'styles.css'
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      comments: false,    // remove all comments
      compress: {         // compress
        drop_debugger: true,
        drop_console: true,
        unused: true,
        dead_code: true,
        screw_ie8: false,
        warnings: false,
      },
      sourceMap: false,
    }),
  )
}

export default config
