/* tslint:disable */
import * as path from 'path'

export default {
  // base configuration
  version: '1.0.5',
  env: process.env.NODE_ENV || 'development',
  render: process.env.RENDER_TYPE || 'client',
  pathBase: path.join(__dirname, '..'),
  pathSrc: path.join(__dirname, '../src'),
  outDir: path.join(__dirname, '../dist'),
  assetsDir: path.join(__dirname, '../src/assets/static'),
  port: process.env.PORT || 4000,
  compilerVendor: [
    'antd',
    'axios',
    'core-js',
    'history',
    'mobx',
    'mobx-react',
    'mobx-react-router',
    'moment',
    'react',
    'react-dom',
    'react-router-dom',
    'react-loadable',
    'ramda',
  ],
  sourcemaps: false,
  globals: {},
  compilerPublicPath: '/',
}
