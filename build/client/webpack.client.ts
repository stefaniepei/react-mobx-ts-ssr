import * as webpack from 'webpack'
import * as path from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin'
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as autoprefixer from 'autoprefixer'
import { CheckerPlugin } from 'awesome-typescript-loader'

import configs from '../../configs'

const inRoot = path.resolve.bind(path, configs.pathBase)
const inRootSrc = (file) => inRoot(configs.pathBase, file)

const __DEV__ = process.env.NODE_ENV === 'development'
const __PROD__ = process.env.NODE_ENV === 'production'

const config = {
  name: 'client',
  target: 'web',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  devtool: __DEV__ ? 'source-map' : false,
  entry: {
    main: [
      'babel-polyfill',
      inRootSrc('src/Render.tsx'),
    ],
  },
  output: {
    filename: 'client.bundle.js',
    path: inRootSrc('dist'),
    publicPath: configs.compilerPublicPath,
  },
  module: {
    loaders: [
    ],
    rules: [
    ],
  },
  plugins: [
    new webpack.DefinePlugin(Object.assign({
      'process.env': { NODE_ENV: JSON.stringify(configs.env), PORT: JSON.stringify(configs.port) },
      __DEV__,
      __PROD__,
    })),
  ],
}

config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: {
    cacheDirectory: true,
    plugins: ['transform-runtime',
      ['import', {
        libraryName: 'antd',
        style: 'css',
      }],
    ],
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
// Development Tools
// ------------------------------------
if (__DEV__) {
  config.entry.main.push(
    `webpack-hot-middleware/client.js?path=/__webpack_hmr&timeout=1000&reload=true`,
  )
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  )
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: inRootSrc('src/index.html'),
      favicon: inRootSrc('favicon.ico'),
      hash: false,
      inject: true,
      manify: {
        collapseWhitespace: true,
      },
    }),
  )
}

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
