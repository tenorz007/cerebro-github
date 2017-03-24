const request = require('superagent');
const { scrapeGitHubTrendingUsers, scrapeGitHubTrendingRepos, scrapeGithubUsers, scrapeGithubRepos } = require('./scrape');
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

    if (input.group === 'users' && input.type === 'trending') {
        records = scrapeGitHubTrendingUsers(input.path, input.query);
    } else if (input.group === 'repos' && input.type === 'trending') {
        records = scrapeGitHubTrendingRepos(input.path, input.query);
    } else if (input.group === 'users' && input.type === 'users') {
        records = scrapeGithubUsers(input.query);
    } else {
        records = scrapeGithubRepos(input.path, input.query);
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
    searchApi,
    searchGithub
};
