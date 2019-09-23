// shared/routes.js
import Home from './Home'
import Grid from './Grid'
import Book from './Book'
import { fetchPopularRepos } from './api'
import { fetchBook } from './api'

const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/popular/:id',
    component: Grid,
    fetchInitialData: (path = '') => fetchPopularRepos(
      path.split('/').pop()
    ),
  },
  {
    path: '/books',
    component: Book,
    fetchInitialData: (book = null) => fetchBook(),
  }
]

export default routes