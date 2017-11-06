import * as React from 'react'
import * as ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Provider from './Provider'
import configs from '../configs'

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
  module.hot.accept('./Provider', () => {
    render(Provider)
  })
}