const React = require('react');
const { parseInput } = require('./input');
const { searchGithub } = require('./search');

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trending: [],
            trendingUsers: [],
            repos: [],
            users: [],
            error: {
                type: '',
                message: ''
            }
        }
    }

    componentDidMount() {
        let term = parseInput(this.props.term);

        searchGithub(term)
            .then(res => this.setState({ [term.type]: res }))
            .then(err => this.setState({ error: {type: term.type, message: err}}));
    }

    render() {
        return (
            <div>
                <pre>{ this.state.trending }</pre>
                <pre>{ this.state.trendingUsers }</pre>
                <pre>{ this.state.repos }</pre>
                <pre>{ this.state.users }</pre>
            </div>
        );
    }
}

Preview.propTypes = {
    term: React.PropTypes.string.isRequired
}

module.exports = Preview;
