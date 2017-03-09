const React = require('react');

class User extends React.Component {
    renderRepos() {
        const { repos, openRepos } = this.props;

        return repos.map((repo, idx) => (
            <Repo key={idx} repo={repo} onClick={openRepo} />
        ));
    }

    renderBody() {
        const { avatar_url, login, name, html_url, bio, location, email, repo } = this.props.user;
        const { repos, onClick } = this.props;
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
                        {repo
                            ? (repo.description)
                            : (bio)
                        }
                        <hr />

                        <nav className="level">
                            <div className="level-left">
                                {repo ? (
                                    <a className="level-item">
                                        <span className="tag link-tag icon is-small"><i className="fa fa-storage"></i>{repo.slug}</span>
                                    </a>
                                ) : ('')}
                                {location ? (
                                    <a className="level-item">
                                        <span className="tag link-tag icon is-small"><i className="fa fa-map-maker"></i>{location}</span>
                                    </a>
                                ) : ('')}
                                {email ? (
                                    <a className="level-item">
                                        <span className="tag link-tag icon is-small"><i className="fa fa-envelope-o"></i>{email}</span>
                                    </a>
                                ) : ('')}
                            </div>
                        </nav>
                    </div>

                    <footer className="card-footer">
                        <a className="card-footer-item" href={html_url}><i className="fa fa-github"></i>Open User</a>
                        {repo ? (
                            <a className="card-footer-item" href={repo.html_url}><i className="fa fa-github"></i>Open Repo</a>
                        ) : ('')}
                        {repos ? ('') : (
                            <a className="card-footer-item" onClick={onClick}><i className="fa fa-archive"></i>Open User Repos</a>
                        )}
                    </footer>

                    {repos ? (this.renderRepos()) : ('')}
                </div>
            </div>
        );
    }

    render() {
        return this.renderBody();
    }
}

User.propTypes = {
    user: React.PropTypes.object.isRequired
};

module.exports = User;
