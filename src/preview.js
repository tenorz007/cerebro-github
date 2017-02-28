const React = require('react');
const parseInput = require('./input');
const Spinner = require('react-spinkit');
const { searchGithub } = require('./search');
const Repo = require('./repo');
const TrendingUser = require('./trending-user');
const User = require('./user');
const Error = require('./error');
require('./style.sass');

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trending: [],
            trendingUsers: [],
            repos: [],
            users: [],
            error: {
                type: null,
                message: null
            }
        }
    }

    componentDidMount() {
        let term = parseInput(this.props.term);

        searchGithub(term)
            .then(res => this.setState({
                [term.type]: res,
                error: {message: null, type: null}
            }))
            .catch(err => this.setState({ error: {type: term.type, message: err}}));
    }

    renderTrendingRepos() {
        const { trending } = this.state;

        return trending.map((repo, idx) => (
            <Repo key={idx} repo={repo}  />
        ))
    }

    renderTrendingUsers() {
        const { trendingUsers } = this.state;

        return trendingUsers.map((user, idx) => (
            <TrendingUser key={idx} user={user}  />
        ))
    }

    renderRepos() {
        const { repos } = this.state;

        return repos.map((repo, idx) => (
            <Repo key={idx} repo={repo}  />
        ))
    }

    renderUsers() {
        const { users } = this.state;

        return users.map((user, idx) => (
            <User key={idx} user={user}  />
        ))
    }


    render() {
        const { trending, trendingUsers, repos, users, error } = this.state;

        if (error.message) {
            return (
                <Error message={error.message} type={error.type} />
            );
        }

        if (! trending.length && ! trendingUsers.length && ! users.length && ! repos.length) {
            return <Spinner spinnerName='wave' noFadeIn />
        }


        if (trending.length > 0) {
            return (
                <div className="preview">
                    { this.renderTrendingRepos() }
                </div>
            )
        }

        if (trendingUsers.length > 0) {
            return (
                <div className="preview">
                    { this.renderTrendingUsers() }
                </div>
            )
        }

        if (users.length > 0) {
            return (
                <div className="preview">
                    { this.renderUsers() }
                </div>
            )
        }

        return (
            <div className="preview">
                { this.renderRepos() }
            </div>
        );
    }
}

Preview.propTypes = {
    term: React.PropTypes.string.isRequired
};

module.exports = Preview;
