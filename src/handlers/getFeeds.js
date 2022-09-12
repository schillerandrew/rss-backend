'use strict';

let Parser = require('rss-parser');
let parser = new Parser();

const getFeeds = async (req, res, next) => {
  let { url } = req.query;
  // console.log('URL ---->>>>', url);
  try {
    let response = await parser.parseURL(url);
    // console.log('FEEDS', response.items);
    res.status(200).send(response.items);
  } catch (e) {
    console.log(e.messsage);
  }
};

module.exports = getFeeds;
