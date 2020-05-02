const path = require('path');
require('dotenv').config();

module.exports = {
  env: {
    REACT_APP_AUTH0_DOMAIN: process.env.REACT_APP_AUTH0_DOMAIN,
    REACT_APP_AUTH0_CLIENT_ID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    REACT_APP_HASURA_ENDPOINT: process.env.REACT_APP_HASURA_ENDPOINT,
    REACT_APP_HASURA_SOCKET_ENDPOINT: process.env.REACT_APP_HASURA_SOCKET_ENDPOINT,
    REACT_APP_LOGROCKET_KEY: process.env.REACT_APP_LOGROCKET_KEY,
  },
  webpack: config => {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    config.resolve.alias['@components'] = path.join(__dirname, 'src/components');
    config.resolve.alias['@styled'] = path.join(__dirname, 'src/styled');
    config.resolve.alias['@hooks'] = path.join(__dirname, 'src/hooks');
    config.resolve.alias['@utils'] = path.join(__dirname, 'src/utils');
    config.resolve.alias['@contexts'] = path.join(__dirname, 'src/contexts');
    config.resolve.alias['@graphql'] = path.join(__dirname, 'src/graphql');
    config.resolve.alias['@generated'] = path.join(__dirname, 'src/generated');
    return config;
  },
};
