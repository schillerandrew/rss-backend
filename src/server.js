'use strict';

// 3rd Party Resources
const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

let PORT = process.env.PORT || 3002;

const mongoose = require('mongoose');
mongoose.connect(process.env.DB);
// const UserObject = require('./userModel');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// Handlers
const createUserData = require('./handlers/createUserData');
const addFeed = require('./handlers/addFeed');
const getFeeds = require('./handlers/getFeeds');

// Error Handlers
const errorHandler = require('./errorHandlers/500.js');
const notFound = require('./errorHandlers/404.js');

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

// Routes
// app.use(authRouter);

addFeed('andrew');

app.post('/userData', createUserData);
app.get('/feeds', getFeeds);

// Catchalls
app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: () => {
    if (!PORT) {
      throw new error('Missing PORT');
    }
    app.listen(PORT, () => {
      console.log(`Server is up on ${PORT}`);
    });
  }
};
