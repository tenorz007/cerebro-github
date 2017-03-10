const React = require('react');
const ReactMarkdown = require('react-markdown');
const { searchApi } = require('./search');
const Spinner = require('react-spinkit');

class ReadMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = { readme: null }
    }

    componentDidMount() {
        let input = { path: `repos/${this.props.readme}/readme`, query: {} };
        input = JSON.stringify(input)

        searchApi(input)
            .then(res => this.setState({ readme: res.body }));
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
        if (! this.state.readme) {
            return <Spinner spinnerName='wave' noFadeIn />
        }

        return this.renderBody()
    }
}

ReadMe.propTypes = {
    readme: React.PropTypes.string.isRequired
};

module.exports = ReadMe;
