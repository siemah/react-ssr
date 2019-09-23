import express from "express";
import cors from "cors";
import serialize from 'serialize-javascript'
import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter, } from 'react-router-dom';
import App from '../shared/App';
import routes from '../shared/routes';

const app = express();

app.use(cors());

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static("public"));

// handle all routes
app.get('*', (req, res, next) => {
  // find the matched route requested by user
  let _activeRoute = routes.find(route => matchPath(req.url, route)) || {};
  // verify if active route has data 2 fetch then return promise
  let _promiseResponse = _activeRoute.fetchInitialData 
    ? _activeRoute.fetchInitialData(req.path)
    : Promise.resolve();
  // render the right component
  _promiseResponse
    .then( data => {
      const _markup = renderToString(
        <StaticRouter location={req.url} context={{data}}>
          <App />
        </StaticRouter>
      );
      res.send(getHtmlSkeleton(_markup, data));
    })
    .catch(next)
});

function getHtmlSkeleton(markup, data = null) {
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