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

    getUserRepos(user, url) {
        let input = {
            path: `search/repositories`,
            query: `user:${url}&sort=stars&order=desc&per_page=9`
        };
        input = JSON.stringify(input);

        searchApi(input)
            .then(res => this.setState({
                repos: { repos: res.body.items },
                users: { user: user }
            }))
            .catch(err => this.setState({ error: { group: 'repos', type: 'repos', message: err }}));
    }

    getReadMe(repo, url) {
        let input = { path: `repos/${url}/readme`, query: {} };
        input = JSON.stringify(input)

        searchApi(input)
            .then(res => this.setState({
                repos: { readme: res.body,  repo: repo }
            }))
            .catch(err => this.setState({ error: { group: 'repos', type: 'readme', message: err }}));
    }

    goBack(stateObject, type) {
        const currentState = this.state[stateObject][type];
        this.setState({ stateObject : { type: currentState }});
    }

    renderUsers(users) {
        let userRepos = this.state.repos ? this.state.repos : null;
        userRepos = userRepos ? userRepos.repos : null;

        return users.map((user, idx) => (
            <User key={idx} user={user} repos={userRepos} onClick={() => this.getUserRepos(user, user.login)} />
        ));
    }

    renderRepos(repos) {
        return repos.map((repo, idx) => (
            <Repo key={idx} repo={repo} onClick={() => this.getReadMe(repo, repo.full_name)} />
        ));
    }

    render() {
        const { users, repos, error } = this.state;
        if (error.message) {
            return <SearchError group={error.group} type={error.type} message={error.message} />
        }

        if (! repos && ! users) {
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
                        ? <User user={user} onClick={() => this.getUserRepos(user, user.login)} repos={userRepos} goBack={() => this.goBack('users', 'users')}/>
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
                    ? <Repo repo={repo} readme={readme} goBack={() => this.goBack('repos', 'repos')} />
                    : this.renderRepos(repoList) }
            </div>
        );
    }
}

Preview.propTypes = {
    term: React.PropTypes.string.isRequired
};

module.exports = Preview;
