const React = require('react');

class Repo extends React.Component {
    render() {
        const { name, url, description, language, language_color, stars, stars_in_period, forks, updated } = this.props.repo;

        return (
            <div>
                <article>
                    <div>
                        <h2>{name}</h2>
                        <p>{description}</p>
                        <div>
                            <span>Language: {language}</span>
                            <span>Stars: {stars}</span>
                            <span>Forks: {forks}</span>
                            <span>{stars_in_period}</span>
                            <span>{updated}</span>
                        </div>
                    </div>
                </article>
            </div>
        )
    }
}

Repo.propTypes = {
    repo: React.PropTypes.object.isRequired
};

module.exports = Repo;
