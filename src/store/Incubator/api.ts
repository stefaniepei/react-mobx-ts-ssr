import axios from '../axios'

// import _debug from 'debug'

// const debug = _debug('app:Promise:Inncubator')

export function leaveMessage(params: any) {
  return axios.post(`/message/leaveMessage`, params)
}
