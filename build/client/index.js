import configs from '../../configs'
import app from './app'

app.listen(configs.port, () => {
  console.log('ClientRender is running at http://localhost:' + configs.port)
})
