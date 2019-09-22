import express from "express";
import cors from "cors";
import serialize from 'serialize-javascript'
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../shared/App';

const app = express();

app.use(cors());

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static("public"));

// handle all routes
app.get('*', (req, res) => {
  const data='siemah';
  const _markup = renderToString(<App data={data} />);
  res.send(getHtmlSkeleton(_markup, data));
});

function getHtmlSkeleton(markup, data=null) {
  return `<!DOCTYPE html>
    <html>
      <head>
        <title>React SSR app</title>
        <script src="/bundle.js" defer></script>
        <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
      </head>
      <body>
        <div id="app">${markup}</div>
      </body>
    </html>`;
}

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
});