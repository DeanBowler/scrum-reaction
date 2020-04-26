import React, { createContext, useContext, useRef, useState } from 'react';

import createAuth0Client, {
  Auth0ClientOptions,
  Auth0Client,
  RedirectLoginOptions,
  GetTokenSilentlyOptions,
  getIdTokenClaimsOptions,
  LogoutOptions,
} from '@auth0/auth0-spa-js';
import { useMount } from 'react-use';

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
  loginWithRedirect: (o?: RedirectLoginOptions) => void;
  getIdTokenClaims: (o?: getIdTokenClaimsOptions) => void;
  getTokenSilently: (o?: GetTokenSilentlyOptions) => void;
  logout: (o?: LogoutOptions) => void;
}

export const AuthContext = createContext<AuthContextProps>({} as any);

export const useAuth = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [auth0Client, setAuth0Client] = useState<Auth0Client>();

  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [user, setUser] = useState(undefined);

  useMount(() => {
    console.log(process.env);

    setIsLoading(true);

    const initialise = async () => {
      const config: Auth0ClientOptions = {
        domain: process.env.REACT_APP_AUTH0_DOMAIN || 'morning-sound-9681.eu.auth0.com',
        client_id:
          process.env.REACT_APP_AUTH0_CLIENT_ID || 'OjVi0uiIuSX2VgDZVOsWLR6hTn4Dlktx',
        redirect_uri: window.origin,
      };

      const client = await createAuth0Client(config);
      setAuth0Client(client);

      if (window.location.search.includes('code=')) {
        const redirectResult = await client.handleRedirectCallback();

        const desiredLanding =
          redirectResult.appState.returnTo || window.location.pathname;

        window.history.replaceState({}, document.title, desiredLanding);
      }

      const authenticated = await client.isAuthenticated();

      setIsAuthenticated(authenticated);
      setUser(authenticated ? await client.getUser() : null);
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
        loginWithRedirect: (...p) => auth0Client && auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client && auth0Client.getTokenSilently(...p),
        getIdTokenClaims: (...p) => auth0Client && auth0Client.getIdTokenClaims(...p),
        logout: (...p) => auth0Client && auth0Client.logout(...p),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
