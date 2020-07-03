import React from 'react';
import gql from 'graphql-tag';

import { useGetOnlineUsersSubscription } from '@generated/graphql';

export const GET_USERS = gql`
  subscription getOnlineUsers {
    online_users {
      user {
        id
        name
        last_seen
      }
    }
  }
`;

interface User {
  id: string;
  name: string;
  last_seen: string;
}

export default function UserList() {
  const { loading, error, data } = useGetOnlineUsersSubscription();

  if (error) {
    console.error(error);
    return null;
  }

  if (loading) return <div>loading</div>;

  return (
    <>
      {data?.online_users.flatMap(online =>
        online.user.map((user: User) => (
          <div key={user.id}>
            {user.name} {user.last_seen}
          </div>
        )),
      )}
    </>
  );
}
