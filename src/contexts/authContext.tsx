import React, { createContext, useContext, useRef, useReducer, useCallback } from 'react';

import Router from 'next/router';

import createAuth0Client, {
  Auth0ClientOptions,
  Auth0Client,
  RedirectLoginOptions,
  GetTokenSilentlyOptions,
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
  getTokenSilently: (o?: GetTokenSilentlyOptions) => Promise<string>;
  logout: (o?: LogoutOptions) => void;
}

export const AuthContext = createContext<AuthContextProps>({} as any);

export const useAuth = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

interface Auth0ContextState {
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  user: AuthUser | undefined;
  userId: string | undefined;
}

const INITIAL_CONTEXT_STATE: Auth0ContextState = {
  isAuthenticated: false,
  isLoadingAuth: true,
  user: undefined,
  userId: undefined,
};

type Auth0ContextAction =
  | { type: 'authenticating' }
  | { type: 'unauthenticated' }
  | { type: 'authenticated'; payload: { user: AuthUser; userId: string } };

function reducer(
  state: Auth0ContextState,
  action: Auth0ContextAction,
): Auth0ContextState {
  switch (action.type) {
    case 'authenticating':
      return { ...state, isLoadingAuth: true };
    case 'unauthenticated':
      return { ...state, isLoadingAuth: false, isAuthenticated: false };
    case 'authenticated':
      return { ...state, isLoadingAuth: false, isAuthenticated: true, ...action.payload };
    default:
      return state;
  }
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const auth0Client = useRef<Auth0Client>();

  const [authState, authStateDispatch] = useReducer(reducer, INITIAL_CONTEXT_STATE);

  useMount(() => {
    const initialise = async () => {
      authStateDispatch({ type: 'authenticating' });

      const config: Auth0ClientOptions = {
        domain: process.env.REACT_APP_AUTH0_DOMAIN || 'morning-sound-9681.eu.auth0.com',
        client_id:
          process.env.REACT_APP_AUTH0_CLIENT_ID || 'OjVi0uiIuSX2VgDZVOsWLR6hTn4Dlktx',
        redirect_uri: window.origin,
        audience: 'https://morning-sound-9681.eu.auth0.com/api/v2/',
        useRefreshTokens: true,
      };

      auth0Client.current = await createAuth0Client(config);

      if (window.location.search.includes('code=')) {
        const redirectResult = await auth0Client.current.handleRedirectCallback();

        const desiredLanding =
          redirectResult.appState.returnTo || window.location.pathname;

        Router.pathname;
        Router.push(desiredLanding);
      }

      try {
        /* if the `auth0.is.authenticated` cookie has expired but there is still a valid refresh token
         then this will ensure we attempt to grab a token and repopulate the cookie
         https://github.com/auth0/auth0-spa-js/issues/95#issuecomment-591425138
       */
        await auth0Client.current.getTokenSilently();
      } catch {
        authStateDispatch({ type: 'unauthenticated' });
      }

      const authenticated = await auth0Client.current.isAuthenticated();

      if (authenticated) {
        const user = await auth0Client.current.getUser();

        authStateDispatch({
          type: 'authenticated',
          payload: { user, userId: user.sub },
        });

        LogRocket.identify(user.sub, {
          name: user.name,
          email: user.email,
        });
      } else {
        authStateDispatch({ type: 'unauthenticated' });
      }
    };

    initialise();
  });

  const loginWithRedirect = useCallback(() => {
    if (!auth0Client.current) throw Error('Auth0 client not ready');
    return auth0Client.current.loginWithRedirect({
      appState: { returnTo: Router.asPath },
    });
  }, [auth0Client.current]);

  const getTokenSilently = useCallback(() => {
    if (!auth0Client.current) throw Error('Auth0 client not ready');
    return auth0Client.current.getTokenSilently();
  }, [auth0Client.current]);

  const logout = useCallback(
    (options?: LogoutOptions) => {
      if (!auth0Client.current) throw Error('Auth0 client not ready');
      auth0Client.current.logout(options);
    },
    [auth0Client.current],
  );

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        loginWithRedirect,
        getTokenSilently,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
