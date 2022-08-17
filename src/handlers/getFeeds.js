'use strict';

const getFeeds = async (req, res, next) => {
  try {
    let feeds = await UserObject.find({});
    res.status(200).send(feeds);
  } catch (e) {
    console.log(e.messsage);
  }
};

module.exports = getFeeds;
