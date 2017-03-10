const React = require('react');
const parseInput = require('./input');
const Spinner = require('react-spinkit');
const { searchApi, searchGithub } = require('./search');
const Repo = require('./repo');
const User = require('./user');
const SearchError = require('./search-error');
require('./style.sass');

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            repos: null,
            loading: false,
            error: {
                group: null,
                type: null,
                message: null
            }
        }
    }

    componentDidMount() {
        let term = parseInput(this.props.term);
        let searchTerm = JSON.stringify(term);

        searchGithub(searchTerm)
            .then(res => this.setState({
                [term.group]: { [term.type]: res },
                error: { group: null, type: null, message: null }
            }))
            .catch(err => this.setState({ error: { group: term.group, type: term.type, message: err }}));
    }

    getUserRepos(users, user, url) {
        let input = {
            // path: 'search/repositories',
            // query: { user: url, sort: 'stars', order: 'desc', per_page: 6 }
            path: `users/${url}/repos`,
            query: { sort: 'updated', direction: 'desc', 'per_page': 6}
        };
        input = JSON.stringify(input);
        this.setState({ loading: true });

        searchApi(input)
            .then(res => this.setState({
                repos: { repos: res.body },
                users: { user: user, users: users },
                loading: false
            }))
            .catch(err => this.setState({ error: { group: 'repos', type: 'repos', message: err }}));

        if (! this.state.user) {
            return <Spinner spinnerName='wave' noFadeIn />
        }
    }

    goBack() {
        let newState = {
            users: this.state.users.users || null,
            trending: this.state.users.trending || null
        };

        this.setState({ users: newState, repos: null });
    }

    renderUsers(users) {
        let userRepos = this.state.repos ? this.state.repos : null;
        userRepos = userRepos ? userRepos.repos : null;

        return users.map((user, idx) => (
            <User
                key={idx}
                user={user}
                repos={userRepos}
                onClick={() => this.getUserRepos(users, user, user.login)}
                goBack={() => this.goBack()}
            />
        ));
    }

    renderRepos(repos) {
        return repos.map((repo, idx) => (
            <Repo
                key={idx}
                repo={repo}
                onClick={() => this.setState({ repos: { readme: true,  repo: repo }})}
            />
        ));
    }

    render() {
        const { users, repos, loading, error } = this.state;

        if (error.message) {
            return <SearchError group={error.group} type={error.type} message={error.message} />
        }

        if ((! repos && ! users) || loading) {
            return <Spinner spinnerName='wave' noFadeIn />
        }

        if (users) {
            let userList = users.trending || users.users || null;
            let user = users.user || null;
            let userRepos = repos ? repos : null;
            userRepos = userRepos ? userRepos.repos : null;

            return (
                <div className="preview">
                    {user
                        ? <User user={user} repos={userRepos} onClick={() => this.getUserRepos(userList, user, user.login)} goBack={() => this.goBack()}/>
                        : this.renderUsers(userList) }
                </div>
            );
        }

        let repoList = repos.trending || repos.repos || null;
        let repo = repos.repo || null;
        let readme = repos.readme || null;

        return (
            <div className="preview">
                {repo
                    ? <Repo repo={repo} readme={readme} />
                    : this.renderRepos(repoList) }
            </div>
        );
    }
}

Preview.propTypes = {
    term: React.PropTypes.string.isRequired
};

module.exports = Preview;
