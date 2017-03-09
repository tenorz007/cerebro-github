const request = require('superagent');
const { scrapeGithubRepos, scrapeGithubUsers, scrapeGitHubTrendingUsers } = require('./scrape');
const { memoize } = require('cerebro-tools');

const BASE_API_URL = 'https://api.github.com';

const searchApi = memoize(input => {
    input = JSON.parse(input);
    let url = `${BASE_API_URL}/${input.path}`;

    return request
        .get(url)
        .query(input.query);
});

const searchGithub = memoize(input => {
    let records;
    input = JSON.parse(input);

    if (input.type == 'trending') {
        records = scrapeGithubRepos(input.path, input.query);
    } else if (input.type == 'trendingUsers') {
        records = scrapeGitHubTrendingUsers(input.path, input.query);
    } else if (input.type == 'users') {
        records = scrapeGithubUsers(input.query);
    } else {
        records = scrapeGithubRepos(input.path, input.query)
    }

    return records
        .then(res => {
            if (res.length < 1) {
                throw new Error('Not Found');
            }
            return res;
        });
});

module.exports = {
    searchGithub
};
    searchApi,
