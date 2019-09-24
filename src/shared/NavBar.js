import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const languages = [{
    name: 'All',
    param: 'all'
  }, {
    name: 'JavaScript',
    param: 'javascript',
  }, {
    name: 'Ruby',
    param: 'ruby',
  }, {
    name: 'Python',
    param: 'python',
  }, {
    name: 'Java',
    param: 'java',
  }]

  return (
    <ul>
      <li>
        <NavLink activeStyle={{ fontWeight: 'bold' }} to={`/books`}>
          books
          </NavLink>
      </li>
      <li>
        <NavLink activeStyle={{ fontWeight: 'bold' }} to={`/login`}>
          Login
          </NavLink>
      </li>
      {languages.map(({ name, param }) => (
        <li key={param}>
          <NavLink activeStyle={{ fontWeight: 'bold' }} to={`/popular/${param}`}>
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  )
};