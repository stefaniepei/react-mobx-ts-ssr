import * as React from 'react'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'

// // 公用部分css
// // import '../public/css/main.less'
// // import '../public/css/core.less'
// // import 'antd/dist/antd.css'

// // home组件里面的一些路由
import HomeRouters from '../containers/Home/router'

// 统一路由方法
import Router from '../routers/router'

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  render() {
    const devToolsNode = process.env.NODE_ENV === 'production'
      ? null
      : <DevTools />
    const routers = [...HomeRouters]
    return (
      <Router routes={routers}>
        {devToolsNode}
      </Router>
    )
  }
}

export default observer(App)
