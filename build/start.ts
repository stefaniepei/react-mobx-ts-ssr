import configs from '../configs'
import app from './client/app'
import 'babel-polyfill'
// require('babel-polyfill')
app.listen(configs.port, () => {
  console.log('Server is running at http://localhost:'+configs.port)
})
