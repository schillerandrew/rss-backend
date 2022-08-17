'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const newUser = new Schema({

  Username: {
    type: String,
    require: true,
    unique: true,
  },
  Password: {
    type: String,
    require: true,
  },
  Role: {
    type: String,
    require: false,
  },
  feedsArray: {
    type: Array,
    require: false,
  },
  articlesArray: {
    type: Array,
    require: false,
  },
});

const userModel = mongoose.model('user', newUser);

module.exports = userModel;