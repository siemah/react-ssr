// shared/routes.js
import Home from './Home'
import Grid from './Grid'
import BooksList from './BooksList'
import { fetchPopularRepos, } from './api'
import { fetchBook } from './api'
import Book from './Book'
import Login from './Login'

const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/popular/:id',
    component: Grid,
    fetchInitialData: (path = '') => fetchPopularRepos(
      path.split('/').pop()
    ),
  },
  {
    path: '/books/:id',
    component: BooksList,
    fetchInitialData: (book=null) => fetchBook(
      book.split('/').pop()
    ),
  },
  {
    path: '/books',
    component: BooksList,
    fetchInitialData: () => fetchBook(),
  },
  {
    path: '/book/:id',
    component: Book,
    fetchInitialData: (book = null) => fetchBook(
      book.split('/').pop()
    ),
  }
]

export default routes