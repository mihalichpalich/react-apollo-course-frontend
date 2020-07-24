import React from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'

import Tabs from "./components/Tabs/Tabs";
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from "./components/theme";

const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    cache: new InMemoryCache()
});

function App() {
  return (
      <ApolloProvider client={client}>
          <MuiThemeProvider theme={theme}>
              <Tabs/>
          </MuiThemeProvider>
      </ApolloProvider>
  );
}

export default App;
