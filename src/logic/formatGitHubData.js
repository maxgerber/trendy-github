module.exports = (json, listLength) => {
  const repos = json.items.slice(0, listLength - 1);

  return repos.map((repo) => {
    const {
      name, description, url, stargazers_count, language,
    } = repo;
    return {
      name, description, url, stargazers_count, language,
    };
  });
};
