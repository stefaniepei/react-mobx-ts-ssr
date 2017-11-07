import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { CheckerPlugin } from 'awesome-typescript-loader'

import configs from '../../configs/index'

const inProject = path.resolve.bind(path, configs.pathBase)
const inProjectSrc = (file) => inProject(configs.pathBase, file)

console.log(inProjectSrc('src/Render.tsx'))

const __DEV__ = process.env.NODE_ENV === 'development'
const __PROD__ = process.env.NODE_ENV === 'production'

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
      // 'babel-polyfill',
      inProjectSrc('src/Render.tsx')
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: inProjectSrc('dist'),
    publicPath: configs.compilerPublicPath
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

// config.module.rules.push({
//   test: /\.(js|jsx)$/,
//   exclude: /node_modules/,
//   use: [{
//     loader: 'babel-loader',
//     query: {
//       cacheDirectory: true,
//       plugins: [
//         'babel-plugin-transform-class-properties',
//         'babel-plugin-syntax-dynamic-import',
//         [
//           'babel-plugin-transform-runtime',
//           {
//             helpers: true,
//             polyfill: false, // we polyfill needed features in src/normalize.js
//             regenerator: true,
//           },
//         ],
//         "transform-runtime",
//         [
//           'babel-plugin-transform-object-rest-spread',
//           {
//             useBuiltIns: true // we polyfill Object.assign in src/normalize.js
//           },
//         ],
//         "babel-plugin-transform-object-assign",
//         ["babel-plugin-import", { libraryName: "antd", style: "css" }]
//       ],
//       presets: [
//         'react', 'es2015', 'stage-0',
//         'babel-preset-react',
//         ['babel-preset-env', {
//           modules: false,
//           targets: {
//             ie9: true,
//           },
//           uglify: true,
//         }],
//       ]
//     },
//   }],
// })

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
