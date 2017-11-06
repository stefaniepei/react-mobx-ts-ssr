import * as webpack from 'webpack'
import * as path from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'

import * as ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin'
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import configs from '../../configs'

const inProject = path.resolve.bind(path, configs.pathBase)
const inProjectSrc = (file: string) => inProject(configs.pathBase, file)


const __DEV__ = process.env.NODE_ENV === 'development'
const __PROD__ = process.env.NODE_ENV === 'production'

const config = {
  entry: {
    normalize: [
      inProjectSrc('src/Normalize.js'),
    ],
    main: [
      'babel-polyfill',
      inProjectSrc('src/Render.js')
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: inProjectSrc('dist'),
    publicPath: configs.compilerPublicPath
  },
  resolve: {
    modules: [
      inProjectSrc('src'),
      'node_modules'
    ],
    extensions: ['.ts', '.tsx', '.json']
  },
  module: {
    rules: [
    ]
  },
  plugins: [
    new webpack.DefinePlugin(Object.assign({
      'process.env': { NODE_ENV: JSON.stringify(configs.env) },
      __DEV__,
      __PROD__,
    })),

    new HtmlWebpackPlugin({
      template: inProjectSrc('src/index.html'),
      hash: false,
      inject: true,
      manify: {
        collapseWhitespace: true
      }
    })
  ]
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
  use: [{
    loader: 'babel-loader',
    query: {
      cacheDirectory: true,
      plugins: [
        'babel-plugin-transform-class-properties',
        'babel-plugin-syntax-dynamic-import',
        // [
        //   'babel-plugin-transform-runtime',
        //   {
        //     helpers: true,
        //     polyfill: false, // we polyfill needed features in src/normalize.js
        //     regenerator: true,
        //   },
        // ],
        [
          'babel-plugin-transform-object-rest-spread',
          {
            useBuiltIns: true // we polyfill Object.assign in src/normalize.js
          },
        ],
        ["babel-plugin-import", { libraryName: "antd", style: "css" }]
      ],
      presets: [
        'react', 'es2015', 'stage-0',
        'babel-preset-react',
        ['babel-preset-env', {
          modules: false,
          targets: {
            ie9: true,
          },
          uglify: true,
        }],
      ]
    },
  }],
})

config.module.rules.push({
  test: /\.ts|tsx?$/,
  enforce: 'pre',
  loader: 'ts-loader!tslint-loader',
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