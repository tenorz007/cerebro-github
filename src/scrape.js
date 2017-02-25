const request = require('superagent');
const cheerio = require('cheerio');

const BASE_URL = 'https://github.com';

const scrapeGithubRepos = (path = 'trending', query = {since: 'today'}) => {
    let url = `${BASE_URL}/${path}`;

    return request
        .get(url)
        .query(query)
        .then(res => {
            let $ = cheerio.load(res.text);
            let records = [];

            $('li.d-block').each(function() {
                let data = $(this);
                let record = {};

                let color = data.children('.mt-2').find('span.repo-language-color');
                let stars_today = data.children('.mt-2').children('.float-right').text().trim();
                let updated =  data.children('.mt-2').find('relative-time').text().trim();

                record.name = data.children().children().children().attr('href');
                record.url = BASE_URL + record.name;
                record.description = data.children().find('p').text().trim();
                record.language = data.children('.mt-2').find('span.mr-3').text().trim();
                record.language_color = color.length ? color.css('background-color') : '';
                record.stars = data.children('.mt-2').find('a.mr-3').eq(0).text().trim();
                record.stars_today = stars_today.slice(0, stars_today.indexOf(' '));
                record.forks = data.children('.mt-2').find('a.mr-3').eq(1).text().trim();
                record.updated = updated.length ? 'Updated on ' + updated : '';

                records.push(record);
            })

            return JSON.stringify(records);
        });
};

const scrapeGithubUsers = (query = {type: 'Users'}) => {
    let url = `${BASE_URL}/search`;

    return request
        .get(url)
        .query(query)
        .then(res => {
            let $ = cheerio.load(res.text);
            let records = [];

            $('div.user-list-item').each(function() {
                let data = $(this);
                let record = {};

                record.img = data.children().children('.avatar').attr('src');
                record.username = data.children('.user-list-info').find('a').eq(0).text().trim();
                record.name = data.children('.user-list-info').text().split('\n')[2].trim();
                record.url = BASE_URL + '/' + record.username;
                record.bio = data.children().children('.user-list-bio').text().trim();
                record.location = data.children().children('.user-list-meta').find('li').eq(0).text().trim();
                record.email = data.children().children('.user-list-meta').find('li').eq(1).text().trim();

                records.push(record);
            })

            return JSON.stringify(records);
        });
};

const scrapeGitHubTrendingUsers = (path = '', query = {since: 'today'}) => {
    let url = `${BASE_URL}/trending/developers/${path}`;

    return request
        .get(url)
        .query(query)
        .then(res => {
            let $ = cheerio.load(res.text);
            let records = [];

            $('li.user-leaderboard-list-item').each(function() {
                let data = $(this);
                let record = {};

                record.img = data.children().children('.leaderboard-gravatar').attr('src');
                record.username = data.children().children('.user-leaderboard-list-name').find('a').eq(0).text().trim().split('\n')[0];
                record.name = data.children().children('.user-leaderboard-list-name').find('a').children('span.full-name').text().trim();
                record.url = BASE_URL + '/' + record.username;
                record.repo_name = BASE_URL + data.children().children('.repo-snipit').attr('href');
                record.repo_slug = data.children().children('.repo-snipit').children('.repo-snipit-name').text().trim();
                record.repo_description = data.children().children('.repo-snipit').children('.repo-snipit-description').text().trim();

                records.push(record);
            })

            return JSON.stringify(records);
        });
};

module.exports = {
    scrapeGithubRepos,
    scrapeGithubUsers,
    scrapeGitHubTrendingUsers
};
