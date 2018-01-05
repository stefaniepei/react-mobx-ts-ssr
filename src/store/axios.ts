import createMemoryHistory from 'history/createMemoryHistory'
import axios from 'axios'
import _debug from 'debug'
import { message } from 'antd'
import { UNAUTHORIZED, TIMEOUT } from '../utils/constant'
import Configs from '../common/Configs'
import ErrorCode from '../utils/dict'

const debug = _debug('promise:Axios')
const history = createMemoryHistory()

axios.defaults.timeout = TIMEOUT //tslint:disable-line

axios.defaults.baseURL = Configs.DEFAULT.SERVER

axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'

//request to show loading
axios.interceptors.request.use((config) => {
  debug('[AxiosRequest]', config)
  return config
}, (error) => {
  return Promise.reject(error)
})

//response to hide loading
axios.interceptors.response.use((response) => {
  debug('[AxiosResponse]', response)
  const code = response.data.code
  let msg = response.data.message
  if (ErrorCode.hasOwnProperty(String(code))) {
    msg = (ErrorCode[String(code)]['zh_CN'])
  }
  if (code === UNAUTHORIZED) {
    message.error(msg || '请登录')
    history.replace('/login')
    location.reload()
  } else if (code === 0 || code === 1) {
    return response.data
  } else {
    response.data.errorMsg = msg
    return response.data
  }
}, (error) => {
  debug('[AxiosError]', error, error.response)
  let code = error.response.status
  let msg = error.response.statusText
  if (ErrorCode.hasOwnProperty(String(code))) {
    msg = (ErrorCode[String(code)]['zh_CN'])
  }
  message.error(msg)
  if (code === UNAUTHORIZED) {
    history.replace('/login')
    location.reload()
  }
})

// debug(axios.defaults)
export default axios
