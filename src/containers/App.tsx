import * as React from 'react'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import { withCookies, Cookies } from 'react-cookie'
// // 公用部分css
// // import '../public/css/main.less'
// // import '../public/css/core.less'
// // import 'antd/dist/antd.css'

// // home组件里面的一些路由
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
      <Routers routes={routes} history={this.props.history} cookies={this.props.cookies}>
        {devToolsNode}
      </Routers>
    )
  }
}

export default withCookies(observer(App))
