import * as React from 'react'
import {BrowserRouter} from 'react-router-dom'
//公用组件
// import Header from '../components/Header'
// import Footer from '../components/Footer'
import createHashHistory from 'history/createBrowserHistory'
const hashHistory = createHashHistory()

import {
  Route,
  Switch,
} from 'react-router-dom'

function Routers({
  routes,
  children,
}) {
  return (
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
