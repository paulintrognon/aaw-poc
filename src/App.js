import React, { Component } from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import Layout from './pages/Layout';
import Home from './pages/Home';

import store from './store.js';

import history from './services/history';
import './services/socket';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout>
              <Route path="/" exact={true} component={Home}></Route>
          </Layout>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
