const rp = require('request-promise-native');
const getWeekStartDate = require('./getWeekStartDate');
const formatGitHubData = require('./formatGitHubData');

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
    const repoData = formatGitHubData(response, 10);
  });
