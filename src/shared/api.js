import fetch from 'isomorphic-fetch'

/**
 * retrieve a list of popular repos on github
 * @param {string} language the name of programming laguage
 */
export function fetchPopularRepos (language = 'all') {
  const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((repos) => repos.items)
    .catch((error) => {
      console.warn(error)
      return null
    });
}

/**
 * retrieve a list of all books
 * @param {string} book mayeb slug or book id
 */
export function fetchBook (book='') {
  const endpoint = !!book
    ? `http://localhost:3001/book/${book}` 
    : `http://localhost:3001/books/`;
  const encodedURI = encodeURI(endpoint)
  console.log('book id ', endpoint)

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((books) => {
      if(!!book) return books 
      return books.books
    })
    .catch((error) => {
      console.warn(error)
      return null
    });
}

export function fetchLoginCredentials (credentials) {
  const endpoint = `http://localhost:3004/auth/login`;
  const encodedURI = encodeURI(endpoint)

  return fetch(encodedURI, {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
    .then((data) => data.json())
    .then(res => res)
    .catch((error) => {
      console.warn(error)
      return null
    });
}