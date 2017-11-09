/* eslint-disable no-unused-vars */
import * as React from 'react'
import { useStrict } from 'mobx'
import { Provider as MobxProvider } from 'mobx-react'
import { syncHistoryWithStore,RouterStore  } from 'mobx-react-router'
import createMemoryHistory from 'history/createMemoryHistory'

import createStore from './store/createStore'
import App from './containers/App'

useStrict(true) // MobX strict mode

const memoryHistory = createMemoryHistory()
const routingStore = new RouterStore()
export const stores = createStore()


export const history = syncHistoryWithStore(
  memoryHistory,
  routingStore,
  ...stores
)

export default function Provider() {
  return (
    <MobxProvider {...stores}>
      <App history={history} />
    </MobxProvider>
  )
}
