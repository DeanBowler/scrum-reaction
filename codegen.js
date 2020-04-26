module.exports = {
  schema: [
    {
      'http://localhost:8080/v1/graphql': {},
    },
  ],
  documents: ['graphql/**/*.tsx', 'graphql/**/*.ts'],
  overwrite: true,
  generates: {
    './generated/graphql.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};
