'use strict';

let Parser = require('rss-parser');
let parser = new Parser();
const UserObject = require('../models/userModel');

const getFeeds = async (req, res, next) => {
  try {
    let results = await UserObject.find({});
    // console.log(results);
    results = results[0].feedsArray[0]; // grabs the first feed of the first user
    let parsedResults = await parser.parseURL(results); // parses RSS feed, from XML to JSON
    res.status(200).send(parsedResults.items); // drills down to items property, so the output is an array of article objects
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = getFeeds;
