import { observable, action, runInAction } from 'mobx'
import * as Cookies from 'universal-cookie'
import i18n from '../../common/i18n'
const cookies = new Cookies()

export default class Base {
  @observable count = +cookies.get('count') || 0
  @observable locale = cookies.get('locale') || 'zh_CN'
  @observable activePath = cookies.get('activePath') || ''
  @observable i18n = i18n.instance.get(this.locale)
  @observable isScroll0 = true
  @observable languageSetter = false
  @observable erwei = ''

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

}
