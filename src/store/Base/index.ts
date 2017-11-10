import { observable, action, runInAction } from 'mobx'
import * as Cookies from 'universal-cookie'
import configs from '../../../configs'
const isNode = typeof window === 'undefined'

const cookies = new Cookies()

export default class Base {
  @observable count = +cookies.get('count') || 0

  @action('Base :: addCount1')
  add = () => {
    try {
      runInAction('Base :: add new count', () => {
        this.count++
        cookies.set('count', this.count, { path: '/' })
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
