import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';

import store from './Src/Reducers/index';
import RootNavigator from './Src/RootNavigator';

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjab2z8t00op50136ek87b8tg' });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <RootNavigator />
        </Provider>
      </ApolloProvider>
    );
  }
}
