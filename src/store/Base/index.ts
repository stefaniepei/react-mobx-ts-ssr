import { observable, action, runInAction } from 'mobx'
import i18n from '../../common/i18n'
import { userLogin, userLogoutToken } from './api'
import _debug from 'debug'
import BaseStore from '../BaseStore'

const debug = _debug('app:AdminStore')


export default class Base extends BaseStore {
  @observable count = +this.Storage.getItem('count') || 0
  @observable locale = this.Storage.getItem('locale') || 'zh_CN'
  @observable activePath = this.Storage.getItem('activePath') || ''
  @observable i18n = i18n.instance.get(this.locale)
  @observable isScroll0 = true
  @observable languageSetter = false
  @observable erwei = ''

  @observable userInfo = this.Storage.getItem('userInfo') || {}  //用户信息详情

  // 赋值
  @action('AdminStore :: setStore')
  setStore(key: any, val: any) {
    this[key] = val
  }

  // 赋值
  @action('AdminStore :: setStore')
  setStoreCookie(key: any, val: any) {
    this[key] = val
    this.Storage.setItem(key, val)
  }

  @action('Base :: addCount1')
  add = () => {
    try {
      runInAction('Base :: add new count', () => {
        this.count++
        this.Storage.setItem('count', this.count)
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

  @action('Base :: setHeaderZero')
  setHeaderZero = (val = true) => {
    this.isScroll0 = val
  }

  @action('Base :: getLanguageSetter')
  getLanguageSetter = () => {
    this.languageSetter = !this.languageSetter
  }

  @action('Base :: setLanguage')
  setLanguage = (val: string) => {
    this.locale = val
    this.Storage.setItem('locale', val)
    this.setI18nData()
  }

  @action('Base :: showErwei')
  showErwei = (val) => {
    this.erwei = this.erwei === val ? '' : val
  }

  @action setI18nData = () => {
    this.i18n = i18n.instance.get(this.locale)
  }

  //  登录
  @action('Admin :: async userLogin')
  userLogin = async(params) => {
    try {
      await userLogin(params)
      // ....
    } catch (e) {
      debug('[StoreError:async userLogin]', e)
    }
  }

  //  登出
  @action('Admin :: async userLogout')
  userLogout = async(params) => {
    try {
      await userLogoutToken(params)
    } catch (e) {
      debug('[StoreError:async userLogout]', e)
    }
  }

}
