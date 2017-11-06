import * as React from 'react'
//公用组件
// import Header from '../components/Header'
// import Footer from '../components/Footer'
// import createHashHistory from 'history/createBrowserHistory'
// const hashHistory = createHashHistory()

import {
  Route,
  Switch,
} from 'react-router-dom'

function Router({
  routes,
  children,
}) {
  return (
    // <BrowserRouter history={hashHistory}>
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
    // </BrowserRouter>
  )
}

export default Router
