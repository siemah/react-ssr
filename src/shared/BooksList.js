import React from 'react'
import Helmet from "react-helmet"
import { NavLink, } from 'react-router-dom'

export default class  BooksList extends React.Component {

  constructor(props) {
    super(props);
    let books;
    if (__isBrowser__) {
      books = window.__INITIAL_DATA__;
      delete window.__INITIAL_DATA__;
    } else {
      books = props.staticContext.data;
    }
    this.state = {
      books: books,
      loading: books ? false : true,
    }
  }

  componentDidMount() {
    // to avoid any state change when component unmounted
    this._isMount = true;
    // fethc books if the data not exist
    // that mean this instruction when 
    // react take over rendering from server
    !this.state.books && this.fetchBooks();
  }

  componentWillUnmount() {
    this._isMount = false;
  }
  

  fetchBooks() {
    this.setState({loading: true})
    this.props.fetchInitialData()
      .then(books => this._isMount && this.setState({loading: false, books}))
      .catch(err => this._isMount && this.setState({loading: false, books: [], err: err.message}))
  }
  

  render() {
    let { loading, books, } = this.state;

    return (
      <div style={{margin: '5%'}}>
        <Helmet>
          <title>Find Books you search for it</title>
          <meta name='description' content='find any kind of book no matter who the author' />
          <meta property='og:title' content='find any kind of book no matter who the author' />
        </Helmet>
        <h1>Book list</h1>
        {
          loading && <h4>Loading ..</h4>
        }
        {
          books && books.map(({_id, description, title}) => (
            <div key={_id}>
              <h2><NavLink to={`/book/${_id}`}>{title}</NavLink></h2>
              <p>{description}</p>
            </div>
          ))
        }
      </div>
    )
  }
}
