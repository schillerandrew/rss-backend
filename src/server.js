'use strict';

// 3rd Party Resources
const express = require('express');
let PORT = process.env.PORT || 3001;

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');

// REQUIRE ROUTES
const authRouter = require('./routes/auth.js');
const alphaRoutes = require('./routes/alpha.js')
const bravoRoutes = require('./routes/bravo.js')

const logger = require('./middleware/logger.js');

const app = express();

app.use(express.json());
app.use(logger);
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRouter);
app.use('/api/alpha', alphaRoutes);
app.use('/api/bravo', bravoRoutes);


// Catchalls
app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: () => {
    if (!PORT) { throw new error ('Missing PORT'); }
    app.listen(PORT, () => {
      console.log(`SERVER is Up on ${PORT}`);
    });
  },
};