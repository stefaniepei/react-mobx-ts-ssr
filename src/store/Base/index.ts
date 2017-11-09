import { observable, action, runInAction } from 'mobx'
import configs from '../../../configs'
const isNode = typeof window === 'undefined'

export default class Base {
  @observable count = 0

  constructor() {
    const initialState = (configs.render === 'server' && !isNode && window.__INITIAL_STATE__.hasOwnProperty('Base')) ? window.__INITIAL_STATE__.Base: {}
    this.count = initialState && initialState.count ? initialState.count : 0;
    console.log(initialState, !!isNode, 'constructor')
  }

  @action('Base :: addCount1')
  add = () => {
    try {
      runInAction('Base :: add new count', () => {
        this.count++
        // localStorage.setItem('count', `${this.count}`)
      })
    } catch (e) {
      runInAction('Base :: count rejected', () => {
        this.count = 0
      })
    }
  }


}
