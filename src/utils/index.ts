import * as Cookies from 'react-cookie'

const Utils = {

  getItem(key, suffix = null) {
    if (suffix != null) {
      if (this.isEmpty(suffix)) {
        return null
      }
      key = suffix + ':' + key
    }
    return Cookies.get(key)
  },

  setItem(key, value, suffix = null, expire = null) {

    let opt = {
      path: '/',
      expires: expire
    }
    if (suffix != null) {
      if (this.isEmpty(suffix)) {
        return null;
      }
      key = suffix + ':' + key
    }

    return Cookies.set(key, value, opt)
  },

  removeItem(key, suffix = null) {

    let opt = {
      path: '/'
    }
    if (suffix != null) {
      if (this.isEmpty(suffix)) {
        return null
      }
      key = suffix + ':' + key
    }

    return Cookies.remove(key, opt)
  },

}

export default Utils
