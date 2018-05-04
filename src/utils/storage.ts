import Utils from '../utils'
import _debug from 'debug'
const debug = _debug('app:Admin:MessageManagement')

const Storage = {
  getItem(key: any) {
    let value
    try {
      value = localStorage.getItem(key)
    } catch (ex) {
      debug('localStorage.getItem报错, ', ex.message)
    } finally {
      return value
    }
  },
  setItem(key: any, val: any) {
    try {
      // ios safari 无痕模式下，直接使用 localStorage.setItem 会报错
      localStorage.setItem(key, val)
    } catch (ex) {
      debug('localStorage.setItem报错, ', ex.message)
    }
  },
  removeItem(key: any) {
    return localStorage.removeItem(key)
  },

  // Basic Data Type for zlib
  getItemBasicZlib(key: any) {
    return Utils.zlibDecryption(this.getItem(key))
  },
  setItemBasicZlib(key: any, val: any) {
    this.setItem(key, Utils.zlibEncryption(val))
  },

  // Reference Data Type
  getItemJson(key: any) {
    return this.getItem(key) != null ? JSON.parse(this.getItem(key)) : {}
  },
  setItemJson(key: any, val: any) {
    this.setItem(key, JSON.stringify(val))
  },

  getItemJsonZlib(key: any) {
    return this.getItem(key) != null ? JSON.parse(Utils.zlibDecryption(this.getItem(key))) : {}
  },
  setItemJsonZlib(key: any, val: any) {
    this.setItem(key, Utils.zlibEncryption(JSON.stringify(val)))
  },

}

export default Storage