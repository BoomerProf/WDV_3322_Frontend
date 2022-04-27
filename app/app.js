const express = require('express');
const app = express();
const router = require('../routes/router');

// parsing without using body parser
app.use(
  express.urlencoded({
    extended: true,
  })
);
// all requests will handle json
app.use(express.json());

// handle all CORS issues by supplying CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE');
  }
  next();
});

// ejs middleware for templating
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

app.use(express.static('public'));
app.use(express.static('views'));

// middleware to call router
app.use('/', router);

// add middleware to handle errors and bad url paths
app.use((req, res, next) => {
  const error = new Error('NOT FOUND!!!');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      status: error.status,
    },
  });
});

module.exports = app;
