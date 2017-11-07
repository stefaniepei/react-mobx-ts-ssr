import * as React from 'react'
import {BrowserRouter} from 'react-router-dom'
import configs from '../../configs'
//公用组件
// import Header from '../components/Header'
// import Footer from '../components/Footer'

import {
  Route,
  Switch,
} from 'react-router-dom'

function Routers({
  routes,
  children,
}) {
  return (
    configs.render === 'server' ?
    <div>
      {children}
      <Switch>
        {
          routes.map(route => (
            <Route
              key={route.path}
              {...route}
            />
          ))
        }
        <Route component={() => <h1>404-Not Found</h1>} />
      </Switch>
    </div>
    :
    <BrowserRouter>
      <div>
        {children}
        <Switch>
          {
            routes.map(route => (
              <Route
                key={route.path}
                {...route}
              />
            ))
          }
          <Route component={() => <h1>404-Not Found</h1>} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Routers
