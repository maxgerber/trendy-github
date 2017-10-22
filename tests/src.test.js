const test = require('tape');
const supertest = require('supertest');
const app = require('../app');
const nock = require('nock');
const rp = require('request-promise-native');

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
    });
});

// GitHub API call returns json
test('GitHub API returns JSON', (t) => {
  const options = {
    uri: 'https://api.github.com/search/repositories?q=created:%3E2017-01-10&',
    qs: {
      sort: 'stars',
      order: 'desc',
    },
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  };

  rp(options)
    .then((response) => {
      const {
        name, description, url, stargazers_count,
      } = response.items[0];
      t.pass('GitHub has returned data successfully');
      t.same(typeof response, 'object', 'Response is an object');
      t.same(typeof name, 'string', 'Response returning name in correct format');
      t.same(typeof description, 'string', 'Response returning description in correct format');
      t.same(typeof url, 'string', 'Response returning url in correct format');
      t.same(typeof stargazers_count, 'number', 'Response returning stargazers_count in correct format');
    }).catch((err) => {
      t.fail(`GitHub API has returned an error message: \n ${err}`);
    });
  t.end();
});
