'use strict';

const { response } = require('express');
let Parser = require('rss-parser');
let parser = new Parser();

let url = [];
const setUrl = (req, res, next) => {
  try {
    let receivedUrl = req.body;
    url.push(receivedUrl);

    getFeeds(req, res, next);
  } catch (e) {
    console.log(e.messsage);
  }
};

const getFeeds = async (req, res, next) => {
  let { url } = req.query;
  console.log('URL ---->>>>', url);
  try {
    // console.log('URL ---->>>>', url[0].rssFeedUrl);

    let response = await parser.parseURL(url);
    console.log('FEEEEDS', response.items);
    res.status(200).send(response.items);
  } catch (e) {
    console.log(e.messsage);
  }
};

module.exports = { getFeeds, setUrl };
