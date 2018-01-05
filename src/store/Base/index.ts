import { observable, action, runInAction } from 'mobx'
import * as Cookies from 'universal-cookie'
import i18n from '../../common/i18n'
import { userLogin, userLogoutToken } from './api'
import _debug from 'debug'

const debug = _debug('app:AdminStore')
const cookies = new Cookies()

export default class Base {
  @observable count = +cookies.get('count') || 0
  @observable locale = cookies.get('locale') || 'zh_CN'
  @observable activePath = cookies.get('activePath') || ''
  @observable i18n = i18n.instance.get(this.locale)
  @observable isScroll0 = true
  @observable languageSetter = false
  @observable erwei = ''

  @observable userInfo = cookies.get('userInfo') || {}  //用户信息详情
  @observable loading = false // 正在加载中...防止重复加载

  // 赋值
  @action('AdminStore :: setStore')
  setStore(key: any, val: any) {
    this[key] = val
  }

  // 赋值
  @action('AdminStore :: setStore')
  setStoreCookie(key: any, val: any) {
    this[key] = val
    cookies.set(key, val, { path: '/' })
  }

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
    cookies.set('locale', val, { path: '/' })
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
