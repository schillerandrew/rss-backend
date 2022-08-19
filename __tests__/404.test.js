'use strict';

const {  server } = require('../src/server');
const supertest = require('supertest');
const request = supertest(server);


describe('Error Handler Tests', () => {
  test('404 bad route', async() => {
    let response = await request.get('/foo');
    expect(response.status).toEqual(404);
    expect(response.text).toEqual('404 Not Found');
  });
  test('404 bad method', async() => {
    let response = await request.put('/hello');
    expect(response.status).toEqual(404);
    expect(response.text).toEqual('404 Not Found');
  });
});