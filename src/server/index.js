import express from 'express'
import bodyParser from 'body-parser';
import compression from 'compression';
import path from 'path';
import index from './router';
import universalLoader from './universal';

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


app.get('/dummy', (req, res) => {
  res.send('hello, world111!')

})//

app.use('/', index)
app.use('/', universalLoader)

/*
app.get('/', (req, res) => {
   
   res.sendFile(path.join(__dirname + '/../index.html'));
    
  logger.info("Response time: "+ res.get('X-Response-Time'));
})
*/

app.all('*', (req, res, next) => {
     //console.log(process.cwd() + '\\index.html')
     res.sendFile(process.cwd() + '/index.html');
})

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

