/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_AUTH0_DOMAIN: string;
    readonly REACT_APP_AUTH0_CLIENT_ID: string;
    readonly REACT_APP_HASURA_ENDPOINT: string;
    readonly REACT_APP_HASURA_SOCKET_ENDPOINT: string;
    readonly REACT_APP_LOGROCKET_KEY: string;
  }
}
