import * as React from 'react'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'

// 公用部分css
// import 'normalize.css'
// import 'antd/dist/antd.css'

const __SSR__ = process.env.RENDER_TYPE === 'server'
if(! __SSR__){
  require('antd/dist/antd.css')
}

// home组件里面的一些路由
import HomeRouters from '../containers/Home/router'

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
    const routes = [...HomeRouters]
    return (
      <Routers routes={routes} history={this.props.history}>
        {devToolsNode}
      </Routers>
    )
  }
}

export default observer(App)
