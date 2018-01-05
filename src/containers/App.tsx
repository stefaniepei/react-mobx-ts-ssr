import * as React from 'react'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'

// 公用部分css
const __SSR__ = process.env.RENDER_TYPE === 'server'
if (!__SSR__) {
  // require('antd/dist/antd.min.css') 可以不要，以后再试试
  require('normalize.css')
  require('../assets/styles/core.scss')
  require('../assets/styles/common.scss')
}

// home组件里面的一些路由
import IndexRouters from '../containers/router'

// 统一路由方法
import Routers from '../routers/routers'

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  render() {
    const devToolsNode = process.env.NODE_ENV === 'production'
      ? null
      : <DevTools />
    const routes = [...IndexRouters]
    return (
      <Routers routes={routes} history={this.props.history}>
        {devToolsNode}
      </Routers>
    )
  }
}

export default observer(App)
