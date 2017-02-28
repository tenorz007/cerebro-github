const React = require('react');

class TrendingUser extends React.Component {
    render() {
        const { img, username, name, url, repo_name, repo_slug, repo_description } = this.props.user;
        const imgStyle = {width: '60px', height: '60px'};

        return (
            <div className="card">
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image">
                                <img src={img} alt="image" style={imgStyle} />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4"><strong>{name}</strong></p>
                            <p className="subtitle is-6">@{username}</p>
                        </div>
                    </div>

                    <div className="content">
                        {repo_description}
                        <hr />
                        <nav className="level">
                            <div className="level-left">
                                <a className="level-item">
                                    <span className="tag link-tag icon is-small"><i className="fa fa-storage"></i>{repo_slug}</span>
                                </a>
                            </div>
                        </nav>
                    </div>

                </div>
                <footer className="card-footer">
                    <a className="card-footer-item" href={url}><i className="fa fa-github"></i>Open User</a>
                    <a className="card-footer-item" href={repo_name}><i className="fa fa-github"></i>Open Repo</a>
                </footer>
            </div>
        )
    }
}

TrendingUser.propTypes = {
    user: React.PropTypes.object.isRequired
};

module.exports = TrendingUser;
