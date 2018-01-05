import * as zlib from 'zlib'

const Utils = {

  // 深拷贝
  deepClone(data) {
    return JSON.parse(JSON.stringify(data))
  },

  // 针对ObservableArray/Object的深拷贝 ==有问题
  deepCloneObservable(data) {
    let o
    const t = typeof (data)
    if (t === 'object') {
      o = data.length ? [] : {}
    } else {
      return data
    }
    if (t === 'object') {
      if (data.length) {
        for (const value of data) {
          o.push(this.deepCloneObservable(value))
        }
        return o
      } else {
        for (const i in data) {
          o[i] = this.deepCloneObservable(data[i])
        }
        return o
      }
    }
  },

  // 转换ObservableArray成Array
  toArray(observableArray) {
    return observableArray.slice()
  },

  /**
   * 将原数组转化为tree
   * @param data 原数组
   * @param id id字段
   * @param pId 父id字段
   * @param appId 一级数组的父id值
   */
  arryToTree(data, id, pId, appId) {
    const arr: any = []
    data.map((e: any, i: any) => {
      e[pId] === appId && arr.push(e)
    })
    const res = this.to3wei(arr, data, id, pId)
    return res
  },

  /**
   * 将一级分支数组转为树
   * @param a 一级分支数组
   * @param old 原数组
   * @param id id字段
   * @param pId 父id字段
   */
  to3wei(a, old, id, pId) {
    a.map((e: any, i: any) => {
      a[i].children = []
      old.map((se: any, si: any) => {
        if (se[pId] === a[i][id]) {
          a[i].children = [...a[i].children, se]
          this.to3wei(a[i].children, old, id, pId)
        }
      })
      if (!a[i].children.length) {
        delete a[i].children
      }
    })
    return a
  },

  /**
   * 交换数组中2个元素位置
   * @param arr 原数组
   * @param i 第一个元素 从0开始计
   * @param j 第二个元素 从0开始计
   */
  arrExchangePos(arr, i, j) {
    arr[i] = arr.splice(j, 1, arr[i])[0]
  },

  /**
   * 使用zlib加密
   * @param str 加密字符串
   */
  zlibEncryption(str = '') {
    return zlib.deflateSync(new Buffer(str)).toString('base64')
  },

  /**
   * 使用zlib解密
   * @param str 解密字符串
   */
  zlibDecryption(str = '') {
    return zlib.unzipSync(Buffer.from(str, 'base64')).toString()
  },
}

export default Utils
