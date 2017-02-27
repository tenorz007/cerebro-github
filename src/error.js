const React = require('react');

class Error extends React.Component {
    render() {
        const { message, type } = this.props;

        return (
            <div>
                <article>
                    <div>
                        <p>{type} Error</p>
                    </div>
                    <div>
                        {message}
                    </div>
                </article>
            </div>
        )
    }
}

Error.propTypes = {
    message: React.propTypes.oneOfType([
        React.proptypes.string,
        React.proptypes.object
    ]).isRequired,
    type: React.propTypes.oneOfType([
        'trending', 'trendingUsers', 'repos', 'users'
    ])
};

module.exports = Error;
