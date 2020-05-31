import React, { createContext, useContext, useState } from 'react';

import Router from 'next/router';

import createAuth0Client, {
  Auth0ClientOptions,
  Auth0Client,
  RedirectLoginOptions,
  GetTokenSilentlyOptions,
  getIdTokenClaimsOptions,
  LogoutOptions,
} from '@auth0/auth0-spa-js';
import { useMount } from 'react-use';
import LogRocket from 'logrocket';

export interface AuthUser {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updated_at: Date;
  email: string;
  email_verified: boolean;
}

interface AuthContextProps {
  isLoadingAuth: boolean;
  isAuthenticated: boolean | undefined;
  user: AuthUser | undefined;
  userId: string | undefined;
  loginWithRedirect: (o?: RedirectLoginOptions) => void;
  getIdTokenClaims: (o?: getIdTokenClaimsOptions) => void;
  getTokenSilently: (o?: GetTokenSilentlyOptions) => Promise<string>;
  logout: (o?: LogoutOptions) => void;
}

export const AuthContext = createContext<AuthContextProps>({} as any);

export const useAuth = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [auth0Client, setAuth0Client] = useState<Auth0Client>();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [user, setUser] = useState<AuthUser>(undefined);
  const [userId, setUserId] = useState<string>(undefined);

  useMount(() => {
    setIsLoading(true);

    const initialise = async () => {
      const config: Auth0ClientOptions = {
        domain: process.env.REACT_APP_AUTH0_DOMAIN || 'morning-sound-9681.eu.auth0.com',
        client_id:
          process.env.REACT_APP_AUTH0_CLIENT_ID || 'OjVi0uiIuSX2VgDZVOsWLR6hTn4Dlktx',
        redirect_uri: window.origin,
        audience: 'https://morning-sound-9681.eu.auth0.com/api/v2/',
      };

      const client = await createAuth0Client(config);
      setAuth0Client(client);

      if (window.location.search.includes('code=')) {
        const redirectResult = await client.handleRedirectCallback();

        const desiredLanding =
          redirectResult.appState.returnTo || window.location.pathname;

        Router.pathname;
        Router.push(desiredLanding);
      }

      const authenticated = await client.isAuthenticated();

      setIsAuthenticated(authenticated);

      if (authenticated) {
        const user = await client.getUser();
        setUser(user);

        setUserId(user.sub);

        LogRocket.identify(user.sub, {
          name: user.name,
          email: user.email,
        });
      }

      setIsLoading(false);
    };

    initialise();
  });

  return (
    <AuthContext.Provider
      value={{
        isLoadingAuth: isLoading,
        isAuthenticated,
        user,
        userId,
        loginWithRedirect: (...p) =>
          auth0Client &&
          auth0Client.loginWithRedirect({
            appState: { returnTo: Router.asPath },
            ...p,
          }),
        getTokenSilently: (...p) => auth0Client && auth0Client.getTokenSilently(...p),
        getIdTokenClaims: (...p) => auth0Client && auth0Client.getIdTokenClaims(...p),
        logout: (...p) => auth0Client && auth0Client.logout(...p),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
