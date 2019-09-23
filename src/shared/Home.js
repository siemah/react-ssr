import React from 'react'
import Helmet from "react-helmet"

export default function Home () {
  return (
    <div>
      <Helmet>
        <title>React Server Side Rendering With Express</title>
        <meta name='description' content='Universal or isomorphic react app with expressjs' />
        <meta property='og:title' content='React Server Side Rendering With Express' />
      </Helmet>
      Select a Language
    </div>
  )
}