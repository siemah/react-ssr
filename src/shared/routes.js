// shared/routes.js
import Home from './Home'
import Grid from './Grid'

const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/popular/:id',
    component: Grid,
  }
]

export default routes