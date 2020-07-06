import React from 'react';
import nodeFetch from 'node-fetch';
import * as ApolloLink from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloProvider } from '@apollo/react-hooks';
import { useAuth } from '@contexts/authContext';
import LogRocket from 'logrocket';

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
          lazy: true,
          inactivityTimeout: 60000,
          connectionParams: async () => {
            const token = await getTokenSilently();
            const authorization = `Bearer ${token}`;
            return authorization ? { authorization, headers: { authorization } } : {};
          },
        },
      })
    : null;

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_HASURA_ENDPOINT,
    fetch: process.browser ? fetch : (nodeFetch as any), // TODO: this may not be needed anymore, I think httpLink uses an isomorphic fetch...
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await getTokenSilently();
    const authorization = token ? `Bearer ${token}` : '';

    // return the headers to the context so httpLink can read them
    return {
      authorization,
      headers: {
        authorization,
        ...headers,
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(error => {
        LogRocket.captureException(error);

        const { message, locations, path } = error;
        LogRocket.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );
      });

    if (networkError) {
      LogRocket.captureException(networkError);
      LogRocket.error(`[Network error]: ${networkError}`);
    }
  });

  const link = wsLink
    ? ApolloLink.split(
        //only create the split in the browser
        // split based on operation type
        ({ query }) => {
          const def = getMainDefinition(query);
          return def.kind === 'OperationDefinition' && def.operation === 'subscription';
        },
        errorLink.concat(wsLink),
        ApolloLink.from([errorLink, authLink, httpLink]),
      )
    : ApolloLink.from([errorLink, httpLink]);

  const client = new ApolloClient({
    assumeImmutableResults: true,
    link,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
