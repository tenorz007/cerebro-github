const React = require('react');

class Repo extends React.Component {
    render() {
        const { name, full_name, html_url, description, language, language_color, stargazers_count, stargazers_period, forks, updated } = this.props.repo;

        let repoLanguage;
        let repoStars;
        let repoForks;
        let repoStarsInPeriod;
        let repoUpdated;

        if (language) {
            repoLanguage = <small className="level-item">
                                <span className="tag link-tag icon is-small"><i className="fa fa-circle-thin" color={language_color}></i>{language}</span>
                            </small>
        }

        if (stargazers_count) {
            repoStars = <small className="level-item">
                            <span className="tag link-tag icon is-small"><i className="fa fa-star-o"></i>{stargazers_count} stars</span>
                        </small>
        }

        if (forks) {
            repoForks = <small className="level-item">
                            <span className="tag link-tag icon is-small"><i className="fa fa-code-fork"></i>{forks} forks</span>
                        </small>
        }

        if (stargazers_period) {
            repoStarsInPeriod = <small className="level-item">
                                    <span className="tag link-tag icon is-small"><i className="fa fa-star-o"></i>{stargazers_period}</span>
                                </small>
        }

        if (updated) {
            repoUpdated = <small className="level-item">
                                <span className="tag link-tag icon is-small"><i className="fa fa-pencil-square-o"></i>{updated}</span>
                            </small>
        }

        return (
            <div className="card">
                <div className="card-content">
                    <div className="media-content">
                        <p className="title is-5"><i className="fa fa-storage"></i><strong>{full_name}</strong></p>
                    </div>
                    <div className="content">
                        {description}
                        <hr />
                        <nav className="level">
                            <div className="level-left">
                                {repoLanguage}
                                {repoStars}
                                {repoForks}
                            </div>
                            <div className="level-right">
                                {repoStarsInPeriod}
                                {repoUpdated}
                            </div>
                        </nav>
                    </div>

                </div>
                <footer className="card-footer">
                    <a className="card-footer-item"></a>
                    <a className="card-footer-item" href={html_url}><i className="fa fa-github"></i>Open</a>
                    <a className="card-footer-item"></a>
                </footer>
            </div>
        )
    }
}

Repo.propTypes = {
    repo: React.PropTypes.object.isRequired
};

module.exports = Repo;
