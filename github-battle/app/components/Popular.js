import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

function LanguagesNav({ selected, onUpdateLanguage }) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
    return(
        <ul className='flex-center'>
            {languages.map((language) => (
                <li key={language}>
                    <button className="btn-clear nav-link"
                    style={language === selected ? {color: 'rgb(255, 175, 55)'} : null}
                    onClick={() => onUpdateLanguage(language)}>
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    )
}

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

export default class Popular extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLanguage: 'All',
            repos: {},
            error: null
        }
        this.updateLanguage = this.updateLanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }

    // Use lifecycle to load initial api data
    componentDidMount () {
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage (selectedLanguage) {
        this.setState({
            selectedLanguage,
            error: null,
            // repos: null
            // Do not instaniate repos to null for caching
            // So that we can display a loading screen without showing repos
        })

        if (!this.state.repos[selectedLanguage]) {
            // If selected language is not cached,
            fetchPopularRepos(selectedLanguage)
                .then((data) => {
                    this.setState(({ repos }) => ({
                        repos: {
                            ...repos,
                            // Merge current state into new object,
                            [selectedLanguage]: data
                            // Whatever data on selected language becomes data from API
                        }
                    }))
                })
                .catch(() => {
                    console.warn('Error fetching repos: ', error)
        
                    this.setState({
                        error: 'There was an error fetching the repositories.'
                    })
                })
        }
    }
    isLoading() {
        const { selectedLanguage, repos, error } = this.state

        return !repos[selectedLanguage] && error === null
    }
    render() {
        const {selectedLanguage, repos, error} = this.state

        return (
            <React.Fragment>
                <LanguagesNav
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                />
                {this.isLoading() && <p>LOADING</p>}
                {error && <p>{error}</p>}
                {repos[selectedLanguage] && <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>}
                {/* because repos is an object, needs to be turned into a string */}
            </React.Fragment>
        )
    }
}