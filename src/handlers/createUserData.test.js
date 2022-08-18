'use strict';

// const supertest = require('supertest');
// const { app, server } = require ('../server');
// const request = supertest(app);

const createUserData = require('./createUserData');
const UserObject = require('../models/userModel');
const db = require('./database');

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.disconnect());

describe('addFeed testing', () => {
  test('New user added succesfully', async (done) => {
    const { userID } = await createUserData('andrew', 'andrew');

    const user = await UserObject.findById(userID);

    expect(user.Username).toEqual('andrew');
    expect(user.Password).toEqual('andrew');
    done();
  })
})