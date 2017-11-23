import axios from 'axios'
import _debug from 'debug'

import Configs from '../common/Configs'
const debug = _debug('app:Promise')

axios.defaults.timeout = 5000 //tslint:disable-line

axios.defaults.baseURL = Configs.DEFAULT.SERVER

axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'

//request to show loading
axios.interceptors.request.use((config) => {

  return config
}, (error) => {

  return Promise.reject(error)
})

const ErrorMessageList = {
  '401': '请登录',
  '429': '获取otp密码次数过多',
  '600': '验证码出错',
  '601': '验证码过期',
  '602': 'Otp验证出错',
  '603': '用户名已经存在',
  '604': '手机号已经存在',
  '605': '邮箱已经存在',
  '606': '认证失败',
  '607': '注册失败',
  '608': '无效的密码修改token',
  '609': '密码修改出错',
  '610': '认证token无效',
  '700': '用户和密码不匹配',
  '701': '密码输错超出次数限制',
  '702': '用户不存在',
  '703': '用户已注销',
  '704': '用户已锁定',
}

//response to hide loading
axios.interceptors.response.use((response) => {
  debug('[AxiosResponse]', response)
  if (response.data.status == 0) {
    return response.data
  }
  return Promise.reject(response.data.message)

}, (error) => {

  debug('[AxiosError]', error)
  let errorCode = error.data.status
  if (error.response) {
    switch (errorCode) {
      case 401:  //tslint:disable-line
      // store.dispatch('USER_LOGIN_OUT')
      //memoryHistory.push('/signin') //jump login page
      default:
        debug('default')
    }
  }
  if (ErrorMessageList.hasOwnProperty(String(errorCode))) {
    return Promise.reject(ErrorMessageList[String(errorCode)])
  } else {
    return Promise.reject(error.response.statusText)
  }
})

// console.log(axios.defaults)
export default axios
