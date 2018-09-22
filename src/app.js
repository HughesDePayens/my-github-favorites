require('isomorphic-fetch');

//React
import React from 'react';
import ReactDOM from 'react-dom';

//Partials
import Header from './components/Header';
import Panel from './components/Panel';
import Form from './components/Form';

//CSS
import 'normalize.css/normalize.css';
import './styles/styles.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [
      ],
      favorites: [
      ],
      searchInputValue: '',
    };

    this.handleAddFavorite = this.handleAddFavorite.bind(this);
    this.handleRemoveFavorite = this.handleRemoveFavorite.bind(this);
    this.verifyFavorites = this.verifyFavorites.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.populateResults = this.populateResults.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
  }

  handleAddFavorite(name, language, latestTag) {
    this.setState((prevState) => {
      let newFavorites = [].concat(prevState.favorites);

      newFavorites.push({
        name,
        language,
        latestTag,
      });

      return { favorites: newFavorites }
    });

    this.verifyFavorites();
  }

  handleRemoveFavorite(name, language, latestTag) {
    this.setState((prevState) => {
      const newFavorites = prevState.favorites.filter((favorite) => {
        return favorite.name !== name && favorite.language !== language && favorite.latestTag !== latestTag;
      });

      return { favorites: newFavorites }
    });

    this.verifyFavorites();
  }

  verifyFavorites() {
    this.setState((prevState) => {
      return prevState.results.map((result) => {
        const isInFavorites = !!prevState.favorites.find((favorite) => {
          return favorite.name == result.name && favorite.language == result.language && favorite.latestTag == result.latestTag;
        });

        return Object.assign(result, {isInFavorites});
      });
    });
  }

  handleSearchSubmit(e) {
    e.preventDefault();

    const query = `
      query {
        search(query: "${this.state.searchInputValue}", type: REPOSITORY, first: 10) {
          edges {
            node {
              ... on Repository {
                nameWithOwner,
                url,
                primaryLanguage {
                  name
                },
                releases(last: 1) {
                  edges {
                    node {
                      tag {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    fetch('https://api.github.com/graphql?access_token=ab3e03ae4ab3bf562922844aa0f66d0eb3a71b70', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        { query: query }
      ),
    })
      .then(res => res.json())
      .then(res => this.populateResults(res.data));
  }

  populateResults(data) {
    this.setState(() => {
      const newResults = data.search.edges.map((result) => {
        const latestTag = result.node.releases.edges.length ? result.node.releases.edges[0].node.tag.name : false;

        return {
          name: result.node.nameWithOwner,
          language: result.node.primaryLanguage.name,
          latestTag,
          isInFavorites: false,
        };
      });

      return { results: newResults }
    });

    this.verifyFavorites();
  }

  handleSearchInputChange(e) {
    const searchInputValue = e.target.value;

    this.setState(() => {
      return {
        searchInputValue,
      };
    });
  }

  render() {
    return (
      <main>
        <Header />

        <div className='main-content'>
          <div className='search-container'>
            <Form action={this.handleSearchSubmit}
              searchInputValue = {this.state.searchInputValue}
              inputHandler = {this.handleSearchInputChange} />

            <Panel panelClass='search-panel'
              rows={this.state.results}
              role='search'
              action='add'
              handler={this.handleAddFavorite} />
          </div>

          <Panel panelClass='favorites-panel'
            rows={this.state.favorites}
            role='favorites'
            action='remove'
            handler={this.handleRemoveFavorite} />
        </div>
      </main>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
