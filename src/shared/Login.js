import React, { useState, } from 'react'
import Helmet from 'react-helmet'
import AuthContext from './context/Auth';

export default function Login({ fetchCredentials, }) {
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
  });
  const [state, setState] = useState({
    loading: false,
    message: null,
  })

  const _onChange = ({ target }) => setCredentials({
    ...credentials, 
    [target.name]: target.value
  });

  const _onSubmit =  (evn) => {
    evn.preventDefault();
    setState({ loading: true, message: null})
    fetchCredentials(evn.target.action, credentials)
      .then(_res => {
        setState({ loading: false, message: null})
      })
      .catch(({ message }) => {
        setState({ loading: false, message})
      })
  }

  return (
    <form action='/auth/login' onSubmit={_onSubmit}>
      <Helmet>
        <title>Login</title>
        <meta name='description' content='Login to SSR account' />
      </Helmet>
      <h1>Login</h1>
      {
        state.message && <mark>{state.message}</mark>
      }
      <input onChange={_onChange} name='email' placeholder='Email address' /><br />
      <input onChange={_onChange} name='password' type='password' placeholder='Your password' /><br />
      <button disabled={!!state.loading} type='submit'>
        {
          !!state.loading
            ? 'Loading ..'
            : 'Let me in'
        }
      </button>  
    </form>
  )
}
