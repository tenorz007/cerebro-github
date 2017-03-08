const React = require('react');

class TrendingUser extends React.Component {
    render() {
        const { avatar_url, login, name, html_url, repo } = this.props.user;
        const imgStyle = {width: '60px', height: '60px'};

        return (
            <div className="card">
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image">
                                <img src={avatar_url} alt="image" style={imgStyle} />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4"><strong>{name}</strong></p>
                            <p className="subtitle is-6">@{login}</p>
                        </div>
                    </div>

                    <div className="content">
                        {repo.description}
                        <hr />
                        <nav className="level">
                            <div className="level-left">
                                <a className="level-item">
                                    <span className="tag link-tag icon is-small"><i className="fa fa-storage"></i>{repo.slug}</span>
                                </a>
                            </div>
                        </nav>
                    </div>

                </div>
                <footer className="card-footer">
                    <a className="card-footer-item" href={html_url}><i className="fa fa-github"></i>Open User</a>
                    <a className="card-footer-item" href={repo.html_url}><i className="fa fa-github"></i>Open Repo</a>
                </footer>
            </div>
        )
    }
}

TrendingUser.propTypes = {
    user: React.PropTypes.object.isRequired
};

module.exports = TrendingUser;
