import fetch from 'isomorphic-fetch'

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
  const encodedURI = encodeURI(`http://localhost:3001/books`)

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((books) => books.books)
    .catch((error) => {
      console.warn(error)
      return null
    });
}