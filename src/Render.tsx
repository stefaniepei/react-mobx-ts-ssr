import * as React from 'react'
import * as ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import configs from '../configs'
import Provider from './Provider'

const render = (Component) => {
  configs.render === 'server' ?
  ReactDom.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  ) :
  ReactDom.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  )
}

render(Provider)

if ((module as any).hot && configs.render !== 'server') {
  (module as any).hot.accept('./Provider', () => {
    render(Provider)
  })
}
