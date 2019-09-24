import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';
import Navbar from './Navbar'
import NoMatch from './NoMatch'
import { AuthProvider, authState } from './context/Auth';
class App extends Component {
  
  constructor(props) {
    super();
    this.state = {
      ...authState,
    }
    this.setAuth = this.setAuth.bind(this);
  }

  setAuth(credentials) {
    this.setState(prevS => ({
      ...prevS,
      ...credentials,
    }));
  }

  render() {
    return (
      <AuthProvider value={{auth: this.state, setAuth: this.setAuth}}>
      <div>
        <Navbar />
        <Switch>
          {routes.map(({ path, exact, component: C, ...rest }) => (
            <Route
              key={path}
              path={path}
              exact={exact}
              render={(props) => (
                <C {...props} {...rest} />
              )}
            />
          ))}
          <Route render={(props) => <NoMatch {...props} />} />
        </Switch>
      </div>
      </AuthProvider>
    )
  }
}

export default App