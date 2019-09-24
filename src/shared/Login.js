import React, { useState, } from 'react'
import Helmet from 'react-helmet'

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
  });

  const _onChange = ({ target }) => setCredentials({
    ...credentials, 
    [target.name]: target.value
  });

  const _onSubmit =  ({ preventDefault, }) => {
    preventDefault();
    
  }

  return (
    <form action='#' onSubmit={_onSubmit}>
      <Helmet>
        <title>Login</title>
        <meta name='description' content='Login to SSR account' />
      </Helmet>
      <h1>Login</h1>
      <input name='email' placeholder='Email address' /><br />
      <input name='password' type='password' placeholder='Your password' /><br />
      <button type='submit'>Let me in</button>  
    </form>
  )
}
