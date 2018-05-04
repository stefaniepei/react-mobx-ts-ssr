import Utils from './index'
const Validate = {

  // 是否是图片
  isImage(imgName = '') {
    return /\.(png|jpg|jpeg|gif|ico)$/.test(imgName) && this.testSpace(name)
  },

  // 中英文、数字，及下划线
  testName(name = '') {
    return /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]){1,100}$/.test(name) && this.testSpace(name)
  },

  //正整数
  testNum(name = '') {
    return /^[0-9]*[1-9][0-9]*$/.test(name)
  },

  // 空格
  testSpace(name = '') {
    return /\s+/g.test(name) ? false : true
  },

  // 是否为url
  isURL(name = '') {
    return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(name) && this.testSpace(name)
  },

  // 文件是否是在规定的大小
  isSize(size, diffSize = 1) {
    return size / 1024 / 1024 < diffSize  //tslint:disable-line
  },

  // 中英文字符长度
  enZhStrLength(str) {
    if (str != undefined) {
      let len = 0
      str = Utils.trim(str)
      for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
          len += 2
        } else {
          len++
        }
      }
      return len
    }
  },
}

export default Validate
