const React = require('react');
const ReactMarkdown = require('react-markdown');
const { searchApi } = require('./search');
const SearchError = require('./search-error');
const Spinner = require('react-spinkit');

class ReadMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            readme: null,
            error: {
                group: null,
                type: null,
                message: null
            }
        }
    }

    componentDidMount() {
        let input = { path: `repos/${this.props.readme}/readme`, query: {} };
        input = JSON.stringify(input)

        searchApi(input)
            .then(res => this.setState({
                readme: res.body,
                error: { group: null, type: null, message: null }
            }))
            .catch(err => this.setState({ error: { group: 'repos', type: 'repos', message: 'No readme found' }}));
    }

    renderBody() {
        const { readme } = this.state;
        const body = new Buffer(readme.content, readme.encoding).toString('ascii');

        return (
            <div className="card-content">
                <div className="content">
                    <ReactMarkdown source={body} />
                </div>
            </div>
        );
    }

    render() {
        const { readme, error } = this.state;

        if (error.message) {
            return <SearchError group={error.group} type={error.type} message={error.message} />
        }

        if (! readme) {
            return <Spinner spinnerName='wave' noFadeIn />
        }

        return this.renderBody()
    }
}

ReadMe.propTypes = {
    readme: React.PropTypes.string.isRequired
};

module.exports = ReadMe;
