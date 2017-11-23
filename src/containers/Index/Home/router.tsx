import HomeIndex from './index'
import Login from './Components/Login/index'

// const loading = ({ isLoading, error }) => {
//   return isLoading && !error ? <div>loading...</div> : error ? <div>error</div> : null
// }

// const AsyncUserLogin = Loadable({
//   loader: () => import('./Components/Login/index.tsx'),
//   loading,
// })
const HomeRouters = [
  {
    path: '/',
    component: HomeIndex,
    hasHead: true,
    exact: true,
    navOptions: {
      label: 'Home Page',
    },
  },
  {
    path: '/login',
    component: Login,
    exact: true,
    navOptions: {
      label: 'Login Page',
    },
  },
]

export default HomeRouters
