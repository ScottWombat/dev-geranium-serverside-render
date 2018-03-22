import express from 'express'
import bodyParser from 'body-parser';
import compression from 'compression';
import path from 'path';
import timestamp from 'console-timestamp';

import configureStore from '../shared/store/configureStore'
import { matchRoutes } from 'react-router-config';
import renderer from './renderer'
import Routes from '../shared/routesConfig';

import getProductList from '../shared/store/retrieveProduct/retrieveProductAction';

import {pageNoChanged} from '../shared/store/pageNoChanged/pageNoAction';


const PORT = process.env.PORT || 3000;
const app = express()

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/static', express.static('public'))

app.use((req, res, next) =>{
   res.setHeader('Access-Control-Allow-Origin', 'https://mygraphql-app.herokuapp.com/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  next()
})
//app.use(morgan(':id :method :url :response-time'))


//app.get('/dummy', (req, res) => {
//  res.send('hello, world111!')

//})

app.get('*', (req, res) => {
  let now = new Date();
  console.log(timestamp('MM-DD hh:mm', now));
    
  const store = configureStore({},true);
    
    
    
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null;
    })
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    const context = {};
    
    const content = renderer(req, store, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }
    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});



// Let's rock
app.listen(PORT, () => {
  console.log(`Geranium is listening on port ${PORT}`);
});

// Handle the bugs somehow
app.on('error', error => {
  logger.info(error)
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

