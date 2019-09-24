import express,  { json, urlencoded } from "express";
import cors from "cors";
import serialize from 'serialize-javascript'
import React from 'react';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter, } from 'react-router-dom';
import App from '../shared/App';
import routes from '../shared/routes';
import { parseCookies } from "./middleware";
import { fetchLoginCredentials } from "../shared/api";
import { verifyUsetToken } from "./utils/api";

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static("public"));
app.use(parseCookies);

// handle all routes
app.post('/auth/login', (req, res) => {
  fetchLoginCredentials(
    `http://localhost:3004/auth/login`,
    req.body,
  )
    .then(_res => {
      let _json;
      if(_res.status === 200) {
        res.cookie('_jwt', _res.user.token);
        _json = {user: {
          fullname: _res.user.fullname,
          email: _res.user.email,
        }}
      } else {
        _json = {
          message: _res.message,
        }
      }
      res.status(_res.status).json(_json);
    })
    .catch (({ message }) => {
      console.log(message)
      res.json({
        message: 'Something went wrong try again after a moment'
      })
    });
});
app.get('/*', (req, res, next) => {
  let userData = {};
  // find the matched route requested by user
  let _activeRoute = routes.find(route => matchPath(req.url, route)) || {};
  // verify if active route has data 2 fetch then return promise
  let _promiseResponse = _activeRoute.fetchInitialData 
    ? _activeRoute.fetchInitialData(req.path)
    : Promise.resolve();
  // render the right component
  _promiseResponse
    .then( data => {
        // verify if current user has loggedin
      if(req.cookies && '_jwt' in req.cookies) {
        const helmetData = Helmet.renderStatic();
        verifyUsetToken(req.cookies._jwt)
          .then( ({email, fullname}) => {
            userData = {email, fullname};
            console.log('from server user data', userData);
            // res.cookie('_test', 'cookie.test', { expires: new Date(Date.now() + 600000), httpOnly: true });
            const _markup = renderToString(
              <StaticRouter location={req.url} context={{data, userData}}>
                <App />
              </StaticRouter>
            );
            res.send(getHtmlSkeleton(_markup, helmetData, data, userData));
          })
          .catch(err => console.log(err))
      } else {
        // res.cookie('_test', 'cookie.test', { expires: new Date(Date.now() + 600000), httpOnly: true });
        const _markup = renderToString(
          <StaticRouter location={req.url} context={{data, userData: userData}}>
            <App />
          </StaticRouter>
        );
        const helmetData = Helmet.renderStatic();
        res.send(getHtmlSkeleton(_markup, helmetData, data, userData));
      }
    })
    .catch(next)
});

function getHtmlSkeleton(markup, helmetData, data=null, userData={}) {
  return `<!DOCTYPE html>
    <html>
      <head>
        ${ helmetData.title.toString() }
        ${ helmetData.meta.toString() }
        <script src="/bundle.js" defer></script>
        <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        <script>window.__USER_DATA__ = ${serialize(userData)}</script>
      </head>
      <body>
        <div id="app">${markup}</div>
      </body>
    </html>`;
}

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
});