import React, { useEffect } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import { pipe } from 'ramda';
import styled from 'styled-components';

import {
  useGetPokerSessionSubscription,
  Poker_User_Session,
  useUpsetUserSessionMutation,
  Poker_Session,
} from '../../generated/graphql';

import { useAuth } from '../../contexts/authContext';
import Text from '../../styled/Text';
import Box from '../../styled/Box';
import Flex from '../../styled/Flex';
import PlanningPokerVoter from './PlanningPokerVoter';
import SessionStats from './SessionStats';
import Card from '../../components/Card';

import { differenceInSeconds, parseISO } from 'date-fns';
import SessionOwnerControls from './SessionOwnerControls';

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

interface PlanningPokerSessionProps {
  sessionId: number;
}

const StyledUserSessionContainer = styled(Flex)`
  border-radius: 5px;

  :hover {
    background: ${p => p.theme.colors.neutralLight};
  }
`;

function UserSession({ user, current_vote }: Poker_User_Session) {
  const isUserActive = pipe(
    parseISO,
    ls => differenceInSeconds(new Date(), ls),
    difference => difference < USER_INACTIVITY_THRESHOLD_SECONDS,
  )(user.last_seen);

  return (
    <StyledUserSessionContainer
      key={user.id}
      p={[1, 2]}
      alignItems="center"
      opacity={isUserActive ? 1 : 0.5}
    >
      <Box width={[6, , 7]}>
        <Text fontSize={[1, 2, 3]}>{user.name}</Text>
        {!isUserActive && <Text> (inactive)</Text>}
      </Box>
      <Text fontSize={[3, 4]} fontWeight="bold">
        {' '}
        {current_vote || '-'}{' '}
      </Text>
    </StyledUserSessionContainer>
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
      {session.owner_id === userId && <SessionOwnerControls sessionId={session.id} />}
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
