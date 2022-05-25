require('dotenv').config();
require('./core/config');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// database
global.db = require('./core/database');

// routes
const routes = require('./routes/public');

const app = express();
const port = process.env.PORT || 5000;
const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg', '.eot', '.pdf'];

const initiateExpressListener = async () => {
  console.info('Initializing Node Server...');
  app.use(cors());

  app.use(bodyParser.raw({ limit: '50mb' }));
  app.use(bodyParser.text({ limit: '50mb' }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT');
    next();
  });

  // routes
  app.use('/api/v1', routes);

  // error handling
  app.use(async (err, req, res, next) => {
    if(err) {
      res.status(err.status ? err.status : 500).send({
        success : false,
        error   : true,
        status  : err.status ? err.status : 500,
        errors  : err.errors ? err.errors : err,
        title   : err.title ? err.title : 'Internal server error!',
        message : err.message ? err.message : 'Sorry, due to an internal server error, we could not process your request at this time.'
      });
    }
    next();
  });

  app.get('*', (req, res) => {
    if(allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
      let splitString = req.url.split('?');
      if(splitString && splitString[0]) {
        res.sendFile(path.resolve(`./client/build/${splitString[0]}`));
      }
    } else {
      res.sendFile(path.resolve('./client/build/index.html'));
    }
  });

  app.on('error', (error) => {
    console.error(error);
  });

  process.on('uncaughtException', (error) => {
    console.error(error);
  });

  app.listen(port);
};

initiateExpressListener().then(() => {
  console.log('\x1b[37m', '--------------------------------');
  console.log('\x1b[32m', ' Node Server Initialized: ' + port);
  console.log('\x1b[37m', '--------------------------------');
}).catch((error) => {
  console.error('ERROR:: Node Server Initialization Failed: ', error);
});