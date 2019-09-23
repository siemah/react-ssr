import React, { useState, useEffect, } from 'react'
import Helmet from "react-helmet"

const Book = (props) => {
  let _isMount = true;
  let book;

  if (__isBrowser__) {
    book = window.__INITIAL_DATA__;
    delete window.__INITIAL_DATA__;
  } else {
    book = props.staticContext.data;
  }
  console.log(book)
  const [bookstate, setBookstate] = useState({
    loading: book ? false : true,
    book,
  });

  const fetchBooks = function () {
    setBookstate({ loading: true })
    props.fetchInitialData(props.match.params.id)
      .then(book => _isMount && setBookstate({ loading: false, book }))
      .catch(err => _isMount && setBookstate({ loading: false, books: [], err: err.message }))
  }

  useEffect(() => {
    !bookstate.book && fetchBooks();
    return () => {
      _isMount = false;
    };
  }, []);

  if (bookstate.loading) return <h2>Loading ..</h2>

  return (
    <div>
      <Helmet>
        <title>{bookstate.book.title}</title>
        <meta name='description' content={bookstate.book.description} />
        <meta property='og:title' content={bookstate.book.description} />
      </Helmet>
      <div id={bookstate.book._id}>
        <h2>{bookstate.book.title}</h2>
        <p>{bookstate.book.description}</p>
        <blockquote>
          ISBN: {bookstate.book.isbn}
        </blockquote>
      </div>
    </div>
  )
}

export default Book
