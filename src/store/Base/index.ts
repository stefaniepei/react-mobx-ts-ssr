import { observable, action, runInAction } from 'mobx'
import { withCookies, Cookies } from 'react-cookie'
import configs from '../../../configs'
const isNode = typeof window === 'undefined'

export default class Base {
  @observable count = 0

  // constructor() {
  //   const initialState = (configs.render === 'server' && !isNode && window.__INITIAL_STATE__.hasOwnProperty('Base')) ? window.__INITIAL_STATE__.Base: {}
  //   const count = initialState && initialState.count ? initialState.count : 0;
  //   this.set(count)
  //   this.count = 0
  // }

  @action('Base :: addCount1')
  add = () => {
    try {
      runInAction('Base :: add new count', () => {
        this.count++
        // Cookies.set('count', `${this.count}`)
      })
    } catch (e) {
      runInAction('Base :: count rejected', () => {
        this.count = 0
      })
    }
  }

  @action('Base :: addCount1')
  set = (val) => {
    try {
      runInAction('Base :: add new count', () => {
        this.count = val
      })
    } catch (e) {
      runInAction('Base :: count rejected', () => {
        this.count = 0
      })
    }
  }

}
