# Cerebro Github
[![npm](https://img.shields.io/npm/v/cerebro-github.svg)](https://www.npmjs.com/package/cerebro-github)
[![npm](https://img.shields.io/npm/dt/cerebro-github.svg)](https://www.npmjs.com/package/cerebro-github)

> Cerebro plugin to get information from github

![](demo.gif)

## Usage

Repo and user search can be queried on (forks, stars, followers, repos, topics, location, size) in any order.
(having, with) are used to declare intent of query.

* Trending Search
    - trending users
    - trending users {using language} {this week}
    - trending repos
    - trending repos {using language} {this month}
* Repo/User Search
    - {user-search-term} user in {location} having more than 10 repos with at least 5 followers
    - {repo-search-term} repo written in {language} with at least 3 forks
    - {repo-search-term} repo having between 4 and 6 stars with 2 topics


## Features

* Processing of query using natural language
* Search github for trending repos or users
* Search github for repo or users based on query
* View user top repositories by most recently updated
* View repo readme

###Todo

- [ ] Add font-awesome
- [x] Show Readme for a selected repo
- [x] Show repos for a selected user

## Related

* [Cerebro](http://github.com/KELiON/cerebro) – main repo for Cerebro app;
* [cerebro tools](http://github.com/KELiON/cerebro-tools) – package with tools to simplify package creation;
* [cerebro stackoverflow](http://github.com/BrainMaestro/cerebro-stackoverflow) - used as a guide for structring of the plugin

## License

MIT © Chizzy Alaedu
