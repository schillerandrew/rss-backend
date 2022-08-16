'use strict';

// 3rd Party Resources
const express = require('express');
const app = express();

require('dotenv').config();
let Parser = require('rss-parser');
let parser = new Parser();
const cors = require('cors');

let PORT = process.env.PORT || 3002;

const mongoose = require('mongoose');
mongoose.connect(process.env.DB);
const userObject = require('./userModel');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// Esoteric Resources
const errorHandler = require('./errorHandlers/500.js');
const notFound = require('./errorHandlers/404.js');

// REQUIRE ROUTES
// const authRouter = require('./routes/auth.js');
// const alphaRoutes = require('./routes/alpha.js')
// const bravoRoutes = require('./routes/bravo.js')

// const logger = require('./middleware/logger.js');


app.use(express.json());
// app.use(logger);
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use(authRouter);
// app.use('/api/alpha', alphaRoutes);
// app.use('/api/bravo', bravoRoutes);

const createUserData = async (req, res, next) => {
  try {
    let user = req.body;
    let response = await userObject.create(user);
    res.status(200).send(response);
  } catch (e) {
    console.log(e.messsage);
  }
};

// const addFeed = async (req, res, next) => {
//   try {
//     let feed = req.body;
//     let user = await this.findOne( { where: { }})
//   } catch (e) {
//     console.log(e.messsage);
//   }
// }

const parseFeed = async () => {
  let feed = await parser.parseURL('https://www.reddit.com/r/MurderedByWords/.rss');
  console.log('TITLE', feed.title);

  feed.items.forEach(item => {
    console.log(item.title, item.link);
  });
};

parseFeed();

const addFeed = async (username, feed) => {
  try {
    let account = await userData.fineOne(username);
    account.feedsArray.push(feed);
  } catch (e) {
    console.log(e.message);
  }
}

app.post('/userData', createUserData);

// Catchalls
app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: () => {
    if (!PORT) { throw new error ('Missing PORT'); }
    app.listen(PORT, () => {
      console.log(`Server is up on ${PORT}`);
    });
  },
};

// module.exports = {
//   server: app,
//   start: () => app.listen(PORT, () => console.log('listening on port', PORT)),
// };