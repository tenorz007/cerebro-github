const React = require('react');

class User extends React.Component {
    render() {
        const { img, username, name, url, bio, location, email } = this.props.user;

        return (
            <div>
                <article>
                    <div>
                        <h2>{name}</h2>
                        <p>{username}</p>
                        <div>
                            <span>{bio}</span>
                            <span>{location}</span>
                            <span>{email}</span>
                        </div>
                    </div>
                </article>
            </div>
        )
    }
}

User.propTypes = {
    user: React.PropTypes.object.isRequired
};

module.exports = User;
