'use strict';

const {  server } = require('../src/server');
const supertest = require('supertest');
const request = supertest(server);

describe('Error Handler Tests', () => {
  test('500', async() => {
    let response = await request.get('/users');
    expect(response.status).toEqual(500);
    expect(response.text).toEqual('Invalid authorization header');
  });
});