import configs from '../../configs'
import app from './app.koa'

app.listen(configs.port, () => {
  console.log('ServerRender is running at http://localhost:' + configs.port)
})
