import React, { useEffect } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Text from '../../styled/Text';
import {
  useGetPokerSessionSubscription,
  Poker_User_Session,
  useUpsetUserSessionMutation,
  Poker_Session,
} from '../../generated/graphql';
import PlanningPokerVoter from './PlanningPokerVoter';
import { useAuth } from '../../contexts/authContext';
import Box from '../../styled/Box';
import Flex from '../../styled/Flex';
import SessionStats from './SessionStats';
import Card from '../../components/Card';

import { differenceInSeconds, parseISO } from 'date-fns';
import { pipe } from 'ramda';

const USER_INACTIVITY_THRESHOLD_SECONDS = 30;

export const GET_POKER_SESSION = gql`
  subscription getPokerSession($id: Int!) {
    poker_session_by_pk(id: $id) {
      id
      name
      owner_id
      user_sessions_aggregate {
        aggregate {
          count
        }
      }
      user_sessions(order_by: { user_id: asc }) {
        current_vote
        user {
          name
          last_seen
          id
        }
      }
    }
  }
`;

export const JOIN_POKER_SESSION = gql`
  mutation upsetUserSession($sessionId: Int!, $userId: String!) {
    insert_poker_user_session(
      objects: { user_id: $userId, session_id: $sessionId }
      on_conflict: { constraint: poker_user_session_pkey, update_columns: current_vote }
    ) {
      affected_rows
    }
  }
`;

interface PlanningPokerSessionProps {
  sessionId: number;
}

function UserSession({ user, current_vote }: Poker_User_Session) {
  const isUserActive = pipe(
    parseISO,
    ls => differenceInSeconds(new Date(), ls),
    difference => difference < USER_INACTIVITY_THRESHOLD_SECONDS,
  )(user.last_seen);

  return (
    <Flex key={user.id} my={[2, 3]} alignItems="center" opacity={isUserActive ? 1 : 0.5}>
      <Box width={[6, , 7]}>
        <Text fontSize={[1, 2, 3]}>{user.name}</Text>
        {!isUserActive && <Text> (inactive)</Text>}
      </Box>
      <Text fontSize={[3, 4]} fontWeight="bold">
        {' '}
        {current_vote || '-'}{' '}
      </Text>
    </Flex>
  );
}

export default function PlanningPokerSession({ sessionId }: PlanningPokerSessionProps) {
  const { userId, isLoadingAuth } = useAuth();

  const [joinSession, { loading: joiningSession }] = useUpsetUserSessionMutation();
  useEffect(() => {
    if (!userId) return;
    joinSession({ variables: { sessionId, userId } });
  }, [userId]);

  const {
    loading: loadingSession,
    data: { poker_session_by_pk: session } = {},
  } = useGetPokerSessionSubscription({
    variables: { id: sessionId },
  });

  if (loadingSession || joiningSession || isLoadingAuth) return <div>loading</div>;
  return (
    <Box maxWidth={[9]} margin="0 auto">
      <Head>
        <title>{session.name}</title>
      </Head>
      <Text as="h2" fontWeight="400" fontSize={[3, 4, 5]}>
        Planning Poker > {session.name}
      </Text>
      <PlanningPokerVoter sessionId={sessionId} />
      <Flex justifyContent="space-between" flexDirection={['column', 'row']}>
        <Card title="Votes">
          <>{session.user_sessions.flatMap(UserSession)}</>
        </Card>
        <SessionStats {...(session as Poker_Session)} />
      </Flex>
    </Box>
  );
}
