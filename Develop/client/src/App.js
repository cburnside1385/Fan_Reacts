import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Popular from './pages/Popular';
import Save from './pages/Save';
import Navbar from './components/Navbar';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
});


const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

//const client = new ApolloClient({
//    link: authLink.concat(httpLink),
//    cache: new InMemoryCache(),
//});
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});
function App() {
    return (
        <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Popular} />
          <Route exact path='/saved' component={Save} />
         {/* <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />*/}
        </Switch>
      </>
            </Router>
        </ApolloProvider>
  );
}

export default App;
