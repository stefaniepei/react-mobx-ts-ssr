import * as path from 'path'

export default {
  // base configuration
  env: process.env.NODE_ENV || 'development',
  render: process.env.RENDER_TYPE || 'client',
  pathBase: path.join(__dirname, '..'),
  pathSrc: path.join(__dirname, '../src'),
  port: 4000,
  compilerVendor: [
    'react',
    'react-dom',
    'react-router-dom'
  ],
  sourcemaps: false,
  globals: {},
  compilerPublicPath: '/'
}
