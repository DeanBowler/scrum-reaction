import React, { useEffect } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import { pipe } from 'ramda';
import styled from 'styled-components';

import {
  useGetPokerSessionSubscription,
  useUpsetUserSessionMutation,
  Poker_Session,
  Users,
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
import { FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Button from '../../styled/Button';

const USER_INACTIVITY_THRESHOLD_SECONDS = 30;

export const GET_POKER_SESSION = gql`
  subscription getPokerSession($id: Int!) {
    poker_session_by_pk(id: $id) {
      id
      name
      owner_id
      votes_visible
      user_sessions_aggregate {
        aggregate {
          count
        }
      }
      user_sessions(order_by: { user_id: asc }) {
        current_vote
        user {
          name
          # last_seen
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

interface UserSessionProps {
  user: Pick<Users, 'id' | 'name'>;
  current_vote: string;
  votes_visible: boolean;
}

function UserSession({ user, current_vote, votes_visible }: UserSessionProps) {
  const { userId } = useAuth();

  // const isUserActive = pipe(
  //   parseISO,
  //   ls => differenceInSeconds(new Date(), ls),
  //   difference => difference < USER_INACTIVITY_THRESHOLD_SECONDS,
  // )(user.last_seen);

  const isVoteVisible = votes_visible || user.id === userId;

  return (
    <StyledUserSessionContainer
      p={[1, 2]}
      alignItems="center"
      // opacity={isUserActive ? 1 : 0.5}
    >
      <Box flex="1 1">
        <Text fontSize={[1, 2, 3]}>{user.name}</Text>
        {/* {!isUserActive && <Text> (inactive)</Text>} */}
      </Box>
      <Box width={3} flex="0 0" mx={[1, 2]}>
        <Text fontSize={[3, 4]} fontWeight="bold">
          {' '}
          {current_vote ? isVoteVisible ? current_vote : <FaEyeSlash /> : '-'}{' '}
        </Text>
      </Box>
    </StyledUserSessionContainer>
  );
}

export default function PlanningPokerSession({ sessionId }: PlanningPokerSessionProps) {
  const { userId, isLoadingAuth } = useAuth();

  const router = useRouter();

  const {
    loading: loadingSession,
    data: { poker_session_by_pk: session } = {},
  } = useGetPokerSessionSubscription({
    variables: { id: sessionId },
  });

  const [joinSession, { loading: joiningSession }] = useUpsetUserSessionMutation();
  useEffect(() => {
    if (!userId) return;
    joinSession({ variables: { sessionId, userId } });
  }, [userId]);

  if (loadingSession || joiningSession || isLoadingAuth) return <div></div>; //todo debounced loader here

  if (!session)
    return (
      <Box marginX="auto" marginY={[4, 5]} textAlign="center">
        <Text as="h2" fontWeight="400" fontSize={[3, 4, 5]}>
          Could not find the session you&apos;re looking for
        </Text>
        <Button onClick={() => router.push('/planning-poker')}>
          Find or create a session
        </Button>
      </Box>
    );

  return (
    <Box maxWidth={[9]} margin="0 auto">
      <Head>
        <title>{session.name}</title>
      </Head>
      <Text as="h2" fontWeight="400" fontSize={[3, 4, 5]}>
        Planning Poker > {session.name}
      </Text>
      {session.owner_id === userId && <SessionOwnerControls sessionId={session.id} />}
      <PlanningPokerVoter sessionId={sessionId} allowVoting={!session.votes_visible} />
      <Flex justifyContent="space-between" flexDirection={['column', 'row']}>
        <Card title="Votes">
          <>
            {session.user_sessions.flatMap(us => (
              <UserSession
                key={us.user.id}
                user={us.user}
                current_vote={us.current_vote}
                votes_visible={session.votes_visible}
              />
            ))}
          </>
        </Card>
        <SessionStats {...(session as Poker_Session)} />
      </Flex>
    </Box>
  );
}
