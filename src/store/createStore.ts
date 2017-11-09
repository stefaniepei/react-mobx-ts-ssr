import { RouterStore } from 'mobx-react-router'

import Base from './Base'

const appStores = {
  RouterStore,
  Base,
}

function createStore() {
  return Object.keys(appStores)
    .reduce((acc: any, storeName: any) => ({
      ...acc,
      [storeName]: new appStores[storeName](),
    }), {})
}

export default createStore
