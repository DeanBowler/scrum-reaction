import React from 'react';
import fetch from 'node-fetch';
import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { useAuth } from './authContext';

interface AuthorizedApolloProviderProps {
  children: React.ReactNode;
}

export default function AuthorizedApolloProvider({
  children,
}: AuthorizedApolloProviderProps) {
  const { getTokenSilently } = useAuth();

  const wsLink = process.browser
    ? new WebSocketLink({
        // if you instantiate in the server, the error will be thrown
        uri: process.env.REACT_APP_HASURA_SOCKET_ENDPOINT,
        options: {
          reconnect: true,
          connectionParams: async () => {
            const token = await getTokenSilently();
            const authorization = `Bearer ${token}`;
            return authorization ? { authorization, headers: { authorization } } : {};
          },
        },
      })
    : null;

  const httplink = new HttpLink({
    uri: process.env.REACT_APP_HASURA_ENDPOINT,
    fetch: fetch,
  });

  const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = await getTokenSilently();
    const authorization = token ? `Bearer ${token}` : '';
    // console.log(token);
    // return the headers to the context so httpLink can read them
    return {
      authorization,
      headers: {
        authorization,
        ...headers,
      },
    };
  });

  // const link = httplink;
  const link = process.browser ? wsLink : httplink;

  // const link = process.browser ? split( //only create the split in the browser
  //   // split based on operation type
  //   ({ query }) => {
  //     const { kind, operation } = getMainDefinition(query);
  //     return kind === 'OperationDefinition' && operation === 'subscription';
  //   },
  //   wsLink,
  //   httplink,
  // ) : httplink;

  const client = new ApolloClient({
    assumeImmutableResults: true,
    link: authLink.concat(link),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
