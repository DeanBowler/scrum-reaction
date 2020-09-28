# Scrum Reaction

<https://scrum-reaction.now.sh/>

## ℹ Overview

A suite of scrum/agile methodology tools

### Planning Poker

Participate in an online [planning poker](https://en.wikipedia.org/wiki/Planning_poker) session, react to the results and hopefully (eventually) reach consensus!

![poker example](https://i.imgur.com/Mb0mmrU.gif)

## 💿 Running Locally

- Install [Node.js](https://nodejs.org/en/download)
- Run `yarn install`
- Run hasura locally by running `yarn hasura:docker`
- Run `yarn start` to the run the client-side application

### 🔐 Auth0 Setup

Authentication is currently implemented using Auth0. Users are created in the database automatically when Auth0 rules are triggered. For this reason it is necessary when first logging into the app locally, to expose your local hasura instance to Auth0, which can be achieved using a service such as [ngrok](https://ngrok.com/)

- Create an auth0 tenant
- Create a SPA application within your auth0 tenant
- Add a new .env.development file with the relevant auth0 configuration
- Within your auth0 tenant add the following "Rules"

```javascript
/// hasura-jwt-claim

function (user, context, callback) {
  const namespace = "https://hasura.io/jwt/claims";

  context.idToken[namespace] = {
    "x-hasura-default-role": "user",

    "x-hasura-allowed-roles": ["user"],
    "x-hasura-user-id": user.user_id
  };

    context.accessToken[namespace] = {
    "x-hasura-default-role": "user",

    "x-hasura-allowed-roles": ["user"],
    "x-hasura-user-id": user.user_id
  };

  return callback(null, user, context);
}
```

```javascript
/// function (user, context, callback) {
  const userId = user.user_id;
  const nickname = user.name;
  const picture = user.picture;

  const hasuraEnvironments = [
    {url: 'http://yourlocalinstance.com/v1/graphql', adminSecret: 'localhostadminkey'},
  ];

  const mutation = `mutation($userId: String!, $nickname: String, $picture: String) {
    insert_users(objects: [{
        id: $userId,
        name: $nickname,
        default_picture: $picture,
      }],
      on_conflict: {
        constraint: users_pkey,
        update_columns: [last_seen, name, default_picture]
      }) {
        affected_rows
      }
    }`;

  hasuraEnvironments.forEach(({url, adminSecret}) => {
    request.post(
      {
        headers: {
          "content-type": "application/json",
          "x-hasura-admin-secret": adminSecret
        },
        url: url,
        body: JSON.stringify({ query: mutation, variables: { userId, nickname, picture } })
      },
      (error, response, body) => {
        console.log(body);
        callback(error, user, context);
      }
    );
  });

  return callback(null, user, context);
}
```
