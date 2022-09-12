'use strict';

function internalError (err, req, res, next) {
  const error = err.message ?
  err.message : err;
  res.status(500).send (error);
}

module.exports = internalError;