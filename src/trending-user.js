const React = require('react');

class TrendingUser extends React.Component {
    render() {
        const { img, username, name, url, repo_name, repo_slug, repo_description } = this.props.user;

        return (
            <div>
                <article>
                    <div>
                        <h2>{name}</h2>
                        <p>{username}</p>
                        <div>
                            <span>Repo Name: {repo_name}</span>
                            <span>{repo_slug}</span>
                            <span>{repo_description}</span>
                        </div>
                    </div>
                </article>
            </div>
        )
    }
}

TrendingUser.propTypes = {
    user: React.PropTypes.object.isRequired
};

module.exports = TrendingUser;
