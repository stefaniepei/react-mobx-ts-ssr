import configs from '../configs'
import app from './client/app'
app.listen(configs.port, () => {
  console.log('Server is running at http://localhost:' + configs.port)
})
