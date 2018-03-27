import * as webpack from 'webpack'
import * as path from 'path'
import * as nodeExternals from 'webpack-node-externals'
import * as ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin'
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as autoprefixer from 'autoprefixer'
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
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  entry: {
    main: [
      'babel-polyfill',
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

// 为打包成单独的css文件而生(webpack3)
const extractSass = new ExtractTextPlugin({
  filename: '[name].min.css',
})

config.module.rules.push({
  test: /\.css$/,
  use: extractSass.extract({
    use: [{
      loader: 'css-loader',
      options: {
        sourceMap: __DEV__,
      },
    }, {
      loader: 'postcss-loader',
      options: {
        plugins: () => [autoprefixer(
          {
            browsers: ['iOS >= 7', 'Android >= 4.1',
              'last 10 Chrome versions', 'last 10 Firefox versions',
              'Safari >= 6', 'ie > 8'],
          },
        )],
        sourceMap: __DEV__,
      },
    }],
    // 在开发环境使用 style-loader
    fallback: 'style-loader',
  }),
})

config.module.rules.push({
  test: /\.(scss|sass)$/,
  use: extractSass.extract({
    use: [{
      loader: 'css-loader',
      options: {
        sourceMap: __DEV__,
      },
    }, {
      loader: 'postcss-loader',
      options: {
        plugins: () => [autoprefixer(
          {
            browsers: ['iOS >= 7', 'Android >= 4.1',
              'last 10 Chrome versions', 'last 10 Firefox versions',
              'Safari >= 6', 'ie > 8'],
          },
        )],
        sourceMap: __DEV__,
      },
    }, {
      loader: 'sass-loader',
      options: {
        sourceMap: __DEV__,
      },
    }],
    // 在开发环境使用 style-loader
    fallback: 'style-loader',
  }),
})

config.module.rules.push({
  test: /\.(mp4)$/,
  use: ['url-loader?name=files/[path][name].[ext]'],
})
config.module.rules.push({
  test: /\.(png|jpg|jpeg|gif|svg)$/,
  use: ['url-loader?limit=8192&name=files/[md5:hash:base64:10].[ext]'],
})
config.module.rules.push({
  test: /\.(eot|ttf|otf|woff|woff2)$/,
  use: ['url-loader?limit=10000&name=files/[md5:hash:base64:10].[ext]'],
})

config.plugins.push(
  new CheckerPlugin(),
  new ForkTsCheckerNotifierWebpackPlugin({
    excludeWarnings: true,
  }),
  new ForkTsCheckerWebpackPlugin({
    checkSyntacticErrors: true,
  }),
  extractSass,
  // new webpack.ProvidePlugin({
  //   $: 'jquery',
  //   jQuery: 'jquery',
  // }),
)
if (__PROD__) {
  config.plugins.push(
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
        warnings: false,
      },
      sourceMap: false,
    }),
  )
}

export default config
