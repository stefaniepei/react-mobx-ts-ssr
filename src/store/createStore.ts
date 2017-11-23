import { RouterStore } from 'mobx-react-router'

import Base from './Base'
import Inncubator from './Index/Incubator'

const appStores = {
  RouterStore,
  Base,
  Inncubator,
}

function createStore() {
  return Object.keys(appStores)
    .reduce((acc: any, storeName: any) => ({
      ...acc,
      [storeName]: new appStores[storeName](),
    }), {})
}

export default createStore
