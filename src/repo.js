const React = require('react');
const ReactMarkdown = require('react-markdown');
const ReadMe = require('./readme');

class Repo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { readme: null };
    }

    renderReadMe() {
        return <ReadMe readme={this.props.repo.full_name} />
    }

    renderBody() {
        const { repo, onClick } = this.props;
        const { name, full_name, html_url, description, language,
            language_color, stargazers_count, stargazers_period,
            forks, updated
        } = repo;
        const readme = this.state.readme;

        return (
            <div className="content" tabIndex="0">
                <div className="box pointer" tabIndex="0">

                    <div className="media-content">
                        <p className="title is-5"><i className="fa fa-storage"></i><strong>{full_name}</strong></p>
                    </div>

                    <div className="content">
                        {description}
                        <br />
                        <nav className="level">
                            <div className="level-left">
                                {language ? (
                                    <small className="level-item">
                                        <span className="tag link-tag icon is-small"><i className="fa fa-circle-thin" color={language_color}></i>{language}</span>
                                    </small>
                                ) : ('') }
                                {stargazers_count ? (
                                    <small className="level-item">
                                        <span className="tag link-tag icon is-small"><i className="fa fa-star-o"></i>{stargazers_count} stars</span>
                                    </small>
                                ) : ('')}
                                {forks ? (
                                    <small className="level-item">
                                        <span className="tag link-tag icon is-small"><i className="fa fa-code-fork"></i>{forks} forks</span>
                                    </small>
                                ) : ('')}
                            </div>
                            <div className="level-right">
                                {stargazers_period ? (
                                    <small className="level-item">
                                        <span className="tag link-tag icon is-small"><i className="fa fa-star-o"></i>{stargazers_period}</span>
                                    </small>
                                ) : ('')}
                                {updated ? (
                                    <small className="level-item">
                                        <span className="tag link-tag icon is-small"><i className="fa fa-pencil-square-o"></i>{updated}</span>
                                    </small>
                                ) : ('')}
                            </div>
                        </nav>
                    </div>

                    <footer className="card-footer">
                        {readme
                            ? (<a className="card-footer-item" onClick={() => { this.setState({readme: false}); this.render()}}><i className="fa fa-chevron-circle-left"></i>Back</a>)
                            : (<a className="card-footer-item" onClick={() => { this.setState({readme: true}); this.render()}}><i className="fa fa-book"></i>View</a>)
                        }
                        <a className="card-footer-item" href={html_url}><i className="fa fa-github"></i>Open</a>
                    </footer>
                </div>
                {readme
                    ? (
                        <nav className="panel">
                            <p className="panel-heading">ReadMe</p>
                            <div className="card">
                                {this.renderReadMe()}
                            </div>
                        </nav>
                        )
                    : ('')
                }
            </div>
        );
    }

    render() {
        return this.renderBody();
    }
}

Repo.propTypes = {
    repo: React.PropTypes.object.isRequired
};

module.exports = Repo;
