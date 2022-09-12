'use strict';

const UserObject = require('../models/userModel');

const addFeed = async (username) => {
  try {
    let account = await UserObject.findOne({ Username: username });
    // console.log('ACCOUNT', account);
    let newFeed = 'https://www.reddit.com/r/news/.rss';
    // let newFeed = await parseFeed();
    await UserObject.findByIdAndUpdate(account._id, {
      $push: { feedsArray: newFeed }
    });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = addFeed;