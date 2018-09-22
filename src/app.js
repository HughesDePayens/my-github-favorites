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
        {
          name: 'Shopify/Timber',
          language: 'Liquid',
          latestTag: 'v1.0',
        },
        {
          name: 'Shopify/Whatever',
          language: 'React',
          latestTag: 'v0.1',
        }
      ],

      favorites: [
        {
          name: 'Shopify/Something',
          language: 'Ruby',
          latestTag: 'v1.4',
        },
        {
          name: 'Shopify/Something',
          language: 'Some Lang',
          latestTag: 'v1.4',
        },
        {
          name: 'Shopify/Something',
          language: 'Ruby',
          latestTag: 'v1.8',
        }
      ],
    };
  }

  render() {
    return (
      <main>
        <Header />

        <div className='main-content'>
          <div className='search-container'>
            <Form />
            <Panel panelClass='search-panel'
              rows={this.state.results}
              role='search'
              action='add' />
          </div>

          <Panel panelClass='favorites-panel'
            rows={this.state.favorites}
            role='favorites'
            action='remove' />
        </div>
      </main>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
