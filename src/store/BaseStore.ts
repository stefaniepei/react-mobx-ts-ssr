import { observable, action, computed } from 'mobx'
import Storage from '../utils/storage'

export default class BaseStore {
  @observable curPage = 1  // 当前页数
  @observable limit = 10  // 每页行数
  @observable loading = false // loading...

  @observable Storage = Storage

  // start
  @computed get start() {
    return (this.curPage - 1) * this.limit
  }

  // 根据索引删除值
  @action('BaseStore :: delIndex')
  delListByIndex(key, index) {
    this[key].splice(index, 1)
  }

  // num,str赋值
  @action('BaseStore :: setter')
  setStore(key: any, val: any) {
    this[key] = val
  }

  // num,str赋值并存储storage
  @action('BaseStore :: setStoreStorage')
  setStoreStorage(key: any, val: any) {
    this[key] = val
    this.setStorage(key, val)
  }
  @action('BaseStore :: setStorage')
  setStorage(key: any, val: any) {
    Storage.setItem(key, val)
  }
  @action('BaseStore :: getStorage')
  getStorage(key: any) {
    return Storage.getItem(key)
  }
  @action('BaseStore :: removeStorage')
  removeStorage(key: any) {
    return Storage.removeItem(key)
  }

  // 加密num,str赋值并存储storage
  @action('BaseStore :: setStoreStorage')
  setStoreStorageZlib(key: any, val: any) {
    this[key] = val
    Storage.setItemBasicZlib(key, val)
  }

  @action('BaseStore :: getStorageZlib')
  getStorageZlib(key: any) {
    return Storage.getItemBasicZlib(key)
  }

  // Json对象赋值
  @action('BaseStore :: setStoreStorageJson')
  setStoreStorageJson(key: any, val: any) {
    this[key] = val
    Storage.setItemJson(key, val)
  }

  @action('BaseStore :: getStorageJson')
  getStorageJson(key: any) {
    return Storage.getItemJson(key)
  }

  // 加密Json对象赋值
  @action('BaseStore :: setStoreStorageZlib')
  setStoreStorageJsonZlib(key: any, val: any) {
    this[key] = val
    Storage.setItemJsonZlib(key, val)
  }

  @action('BaseStore :: getStorageJsonZlib')
  getStorageJsonZlib(key: any) {
    return Storage.getItemJsonZlib(key)
  }

}
