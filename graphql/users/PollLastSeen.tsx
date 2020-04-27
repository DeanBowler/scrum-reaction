import React from 'react';
import gql from 'graphql-tag';
import { useUpdateLastSeenMutation } from '../../generated/graphql';
import { useAuth } from '../../contexts/authContext';
import { useInterval, useMount } from 'react-use';
import useWindowVisible from '../../hooks/useWindowVisible';

export const MUTATE_UPDATE_LAST_SEEN = gql`
  mutation updateLastSeen($userId: String!, $lastSeen: timestamptz!) {
    update_users(where: { id: { _eq: $userId } }, _set: { last_seen: $lastSeen }) {
      affected_rows
    }
  }
`;

export default function PollLastSeen() {
  const { userId } = useAuth();

  const [update] = useUpdateLastSeenMutation();

  const isVisible = useWindowVisible();

  const updateLastSeen = () => {
    if (!userId) return null;

    const lastSeen = new Date().toISOString();

    update({ variables: { userId, lastSeen } });
  };

  useMount(() => updateLastSeen());

  useInterval(
    () => {
      updateLastSeen();
    },
    isVisible ? 10000 : null,
  );

  return <></>;
}
