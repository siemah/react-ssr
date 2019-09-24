import React from 'react';

export const authState = {
  email: null,
  fullname: null,
};
const AuthContext = React.createContext(authState);

export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;