'use strict';

const createUserData = async (req, res, next) => {
  try {
    let user = req.body;
    let response = await UserObject.create(user);
    res.status(200).send(response);
  } catch (e) {
    console.log(e.messsage);
  }
};

module.exports = createUserData;
