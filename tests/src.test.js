const test = require('tape');
const supertest = require('supertest');
const app = require('../app');

// Does tape work?
test('1 equals 1', (t) => {
  t.equals(1, 1, 'one should equal one');
  t.end();
});

// Does supertest work?
test('check if supertest works', (t) => {
  supertest(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.same(res.statusCode, 200, 'Status code is 200');
      t.end();
    })
})
