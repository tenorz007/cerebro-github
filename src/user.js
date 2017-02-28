const React = require('react');

class User extends React.Component {
    render() {
        const { img, username, name, url, bio, location, email } = this.props.user;

        let userLocation;
        let userEmail;

        if (location) {
            userLocation = <a className="level-item">
                            <span className="tag link-tag icon is-small"><i className="fa fa-map-maker"></i>{location}</span>
                        </a>
        }

        if (email) {
            userEmail = <a className="level-item">
                            <span className="tag link-tag icon is-small"><i className="fa fa-envelope-o"></i>{email}</span>
                        </a>
        }

        return (
            <div className="card">
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image" height="40px" width="40px">
                                <img src={img} alt="image" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4">{name}</p>
                            <p className="subtitle is-6">@{username}</p>
                        </div>
                    </div>

                    <div className="content">
                        {bio}
                        <hr />
                        <nav className="level">
                            <div className="level-left">
                                {userLocation}
                                {userEmail}
                            </div>
                        </nav>
                    </div>
                </div>
                <footer className="card-footer">
                    <a className="card-footer-item"></a>
                    <a className="card-footer-item" href={url}>Open</a>
                    <a className="card-footer-item"></a>
                </footer>
            </div>
        )
    }
}

User.propTypes = {
    user: React.PropTypes.object.isRequired
};

module.exports = User;
