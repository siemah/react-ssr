import React, { useState, useContext, } from 'react'
import Helmet from 'react-helmet'
import AuthContext from './context/Auth';

export default function Login({ fetchCredentials, history, staticContext}) {

  let user;

  if (__isBrowser__) {
    user = window.__USER_DATA__;
    delete window.__USER_DATA__;
  } else {
    user = staticContext.userData;
  }

  const authContext = useContext(AuthContext);
  if(user) authContext.setAuth(user)

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
        if('user' in _res) {
          setState({ loading: false, message: null})
          authContext.setAuth(_res.user);
          return;
        }
        setState({ loading: false, message: _res.message, })
      })
      .catch(({ message }) => {
        setState({ loading: false, message: 'Something went wrong, check your internet and try again', })
      })
  }

  if(!!authContext.auth.email) history.push('/')

  return (
    <form action='/auth/login' onSubmit={_onSubmit}>
      <Helmet>
        <title>Login</title>
        <meta name='description' content='Login to SSR account' />
      </Helmet>
      <h1>Login</h1>
      {
        state.message && <h4><mark>{state.message}</mark></h4>
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
