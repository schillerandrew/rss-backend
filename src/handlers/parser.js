'use strict';

let Parser = require('rss-parser');
let parser = new Parser();
const UserObject = require('./userModel');

const parseFeed = async () => {
  let feed = await parser.parseURL('https://www.reddit.com/r/news/.rss');
  // console.log('TITLE', feed.title);
  // console.log('FEED', feed);
  // feed.items.forEach(item => {
  //   console.log(item.title, item.link);
  // });

  return feed;
};

const addFeed = async (username) => {
  // let { Username } = username;
  try {
    let account = await UserObject.findOne({ Username: username });
    console.log('ACCOUNT', account);
    let newFeed = await parseFeed();
    // console.log('FEED', feed);
    // account.feedsArray.push(feed);
    // console.log('FEED', newFeed);
    console.log('ID', account._id);
    await UserObject.findByIdAndUpdate(account._id, {
      $push: { feedsArray: newFeed }
    });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = addFeed;
