const React = require('react');

class SearchError extends React.Component {
    render() {
        const { group, type, message } = this.props;
        let error = format(group, type, message);

        return (
            <div>
                <article className="message">
                    <div className="message-header">
                        <p>{error[1]}</p>
                    </div>
                    <div className="message-body">
                        {error[0]}
                    </div>
                </article>
            </div>
        )
    }
}

SearchError.propTypes = {
    message: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object
    ]).isRequired,
    type: React.PropTypes.oneOf([
        'trending', 'trendingUsers', 'repos', 'users', 'readme'
    ]).isRequired
};

function format(group, type, message) {
    let errorMessage = message.message || message.toString();
    let errorType;

    if (group === 'users' && type === 'trending') {
        errorType = 'Trending Developer Error';
    } else if (group === 'repos' && type === 'trending') {
        errorType = 'Trending Repository Error';
    } else if (group === 'users' && type === 'users') {
        errorType = 'User Search Error';
    } else if (group === 'repos' ) {
        errorType = 'Repository Search Error';
    } else {
        errorType = 'Unknown Error';
    }

    return [errorMessage, errorType];
}

module.exports = SearchError;
