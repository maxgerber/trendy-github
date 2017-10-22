const rp = require('request-promise-native');
const getWeekStartDate = require('../logic/getWeekStartDate');
const formatGitHubData = require('../logic/formatGitHubData');
const dummyData = require('../../tests/dummy-data.json');

exports.get = (req, res) => {
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

  // rp(options)
  //   .then((response) => {
  //     console.log(response);
  const gitHubData = formatGitHubData(dummyData, 10);
  res.render('home', { repos: 'dummyq' });
  // });
};
