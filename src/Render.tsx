import * as React from 'react'
import * as ReactDom from 'react-dom'

import configs from '../configs'
import Provider from './Provider'

const render = (Component) => {
  configs.render === 'server' ?
    ReactDom.hydrate(
      <Component />,
      document.getElementById('app'),
    ) :
    ReactDom.render(
      <Component />,
      document.getElementById('app'),
    )
}

render(Provider)

if ((module as any).hot && configs.render !== 'server') {
  (module as any).hot.accept('./Provider.tsx', () => {
    const containers = require('./Provider.tsx').default
    render(containers)
  })
}
