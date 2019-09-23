import React, { Component } from 'react'
import Helmet from "react-helmet"

export default class Grid extends Component {
  constructor(props) {
    super(props);
    let repos;
    if (__isBrowser__) {
      repos = window.__INITIAL_DATA__;
      delete window.__INITIAL_DATA__;
    } else {
      repos = props.staticContext.data;
    }
    this.state = {
      repos,
      loading: repos ? false : true,
    }
  }

  fetchRepos(lang) {
    this._isMounted && this.setState({loading: true,})
    this.props.fetchInitialData(lang)
      .then(repos => this._isMounted && this.setState({repos, loading: false,}))
      .catch(err => this._isMounted && this.setState({loading: false, repos: []}))
  }

  componentDidMount() {
    this._isMounted = true;
    !this.state.repos && this.fetchRepos(this.props.match.params.id)
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if(this.props.match.params.id !== prevProps.match.params.id)
      this.fetchRepos(this.props.match.params.id)
  }
  

  render() {
    const { repos, loading, } = this.state;

    return (
      <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Helmet>
          <title>{this.props.match.params.id} Popular repos</title>
          <meta name='description' content='Popular repos' />
          <meta property='og:title' content='Popular repos' />
        </Helmet>
        {
          loading
            ? <h4>Loading ..</h4>
            : (
              repos && repos.map(({ name, owner, stargazers_count, html_url }) => (
                <li key={name} style={{ margin: 30 }}>
                  <ul>
                    <li><a href={html_url}>{name}</a></li>
                    <li>@{owner.login}</li>
                    <li>{stargazers_count} stars</li>
                  </ul>
                </li>
              ))
            )
        }
      </ul>
    )
  }
}