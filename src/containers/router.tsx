import * as React from 'react'
import * as Loadable from 'react-loadable'


const loading = ({ isLoading, error }) => {
  return isLoading && !error ? <div>loading...</div> : error ? <div>error</div> : null
}

const HomeRouters = [
  {
    path: '/',
    component: Loadable({
      loader: () => import('./Home'),
      loading,
    }),
    hasHead: true,
    exact: true,
    navOptions: {
      label: 'Home Page',
    },
  },
  {
    path: '/login',
    component: Loadable({
      loader: () => import('./Login'),
      loading,
    }),
    exact: true,
    navOptions: {
      label: 'Login Page',
    },
  },
]

export default HomeRouters
