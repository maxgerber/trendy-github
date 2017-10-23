const test = require('tape');
const supertest = require('supertest');
const getWeekStartDate = require('../src/logic/getWeekStartDate');
const formatGitHubData = require('../src/logic/formatGitHubData');
const app = require('../app');
const rp = require('request-promise-native');
const dummyData = require('./dummy-data.json');

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

// Function takes a date, and returns the date of the last Monday, formatted
// in a YYYY-MM-DD capacity
test('getWeekStartDate function', (t) => {
  const actual = getWeekStartDate(1508664769957);
  const expected = '2017-10-16';
  t.same(actual, expected, 'Passing in UTC timestamp returns formatted date of the last Monday');
  t.end();
});

// GitHub API call returns successfully
test('GitHub API returns JSON', (t) => {
  const weekStart = getWeekStartDate(Date.now());
  const options = {
    uri: `https://api.github.com/search/repositories?q=created:%3E${weekStart}&`,
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
        name, description, url, stargazers_count, language,
      } = response.items[0];
      t.pass('GitHub has returned data successfully');

      if (description === null) {
        t.pass('Response returning an empty description (null)');
      } else {
        t.same(typeof description, 'string' || null, 'Response returning description in correct format');
      }
      t.same(typeof response, 'object', 'Response is an object');
      t.same(typeof name, 'string', 'Response returning name in correct format');
      t.same(typeof url, 'string', 'Response returning url in correct format');
      t.same(typeof stargazers_count, 'number', 'Response returning stargazers_count in correct format');
      t.same(typeof language, 'string', 'Response returning language in correct format');
    }).catch((err) => {
      t.fail(`GitHub API has returned an error message: \n ${err}`);
    });
  t.end();
});

// Function pulls out relevant information from GitHub and returns an array of objects

test('formatGitHubData function', (t) => {
  const actual = formatGitHubData(dummyData, 5);
  console.log(actual);
  const expected = [{
    name: 'avbook',
    description: 'Illegal vehicle from Red Castle',
    url: 'https://api.github.com/repos/guyueyingmu/avbook',
    stargazers_count: 134,
    language: 'PHP',
  },
  {
    name: 'BrowserGather',
    description: 'Fileless web browser information extraction',
    url: 'https://api.github.com/repos/sekirkity/BrowserGather',
    stargazers_count: 126,
    language: 'PowerShell',
  },
  {
    name: 'hyperbitbit',
    description: 'HyperBitBit',
    url: 'https://api.github.com/repos/seiflotfy/hyperbitbit',
    stargazers_count: 125,
    language: 'Go',
  },
  {
    name: 'go-sumtype',
    description: 'A simple utility for running exhaustiveness checks on Go "sum types."',
    url: 'https://api.github.com/repos/BurntSushi/go-sumtype',
    stargazers_count: 119,
    language: 'Go',
  }];
  t.same(actual, expected, 'Function takes a JSON and outputs an array of objects of relevant information');
  t.end();
});
