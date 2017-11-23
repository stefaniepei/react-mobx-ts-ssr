import { observable, action } from 'mobx'
import { message } from 'antd'
import { leaveMessage } from './api'

// import _debug from 'debug'

// const debug = _debug('app:Promise:Inncubator')

// const cookies = new Cookies()

export default class Inncubator {
  @observable tabPosition = 'left'
  @observable fetchData = {}

  @action('BKInncubatorStore :: setTabPosition')
  setTabPosition = (val = 'left') => {
    this.tabPosition = val
  }

  @action('BKInncubatorStore :: async postLeaveMessage')
  postLeaveMessage = async(parms) => {
    try {
      const data = await leaveMessage(parms)
      if (data.status === 0) {
        message.success('success')
      } else {
        message.error('failed')
      }
    } catch (e) {
      this.fetchData = {}
    }
  }


}
