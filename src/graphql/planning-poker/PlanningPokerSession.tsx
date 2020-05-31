import React, { useEffect, useMemo } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { AnimatePresence, motion, Variants } from 'framer-motion';

import {
  useGetPokerSessionSubscription,
  useUpsetUserSessionMutation,
  Poker_Session,
} from '@generated/graphql';

import { useAuth } from '@contexts/authContext';
import Card from '@components/Card';
import Loading from '@components/Loading';
import Text from '@styled/Text';
import Box from '@styled/Box';
import Flex from '@styled/Flex';
import Button from '@styled/Button';

import SessionStats from './SessionStats';
import SessionOwnerControls from './SessionOwnerControls';
import VoterControls from './VoterControls';
import UserSessionRow from './UserSessionRow';
import SessionObservers from './SessionObservers';

export const POKER_USER_SESSION_INFO_FRAGMENT = gql`
  fragment PokerUserSessionInfo on poker_user_session {
    current_vote
    current_revote
    current_reaction
    is_observer
    user {
      name
      id
    }
  }
`;

export const GET_POKER_SESSION = gql`
  subscription getPokerSession($id: Int!) {
    poker_session_by_pk(id: $id) {
      id
      name
      owner_id
      votes_visible
      allow_revotes
      user_sessions_aggregate {
        aggregate {
          count
        }
      }
      user_sessions(order_by: { user_id: asc }) {
        ...PokerUserSessionInfo
      }
    }
  }
  ${POKER_USER_SESSION_INFO_FRAGMENT}
`;

interface PlanningPokerSessionProps {
  sessionId: number;
}

const motionItemVariants: Variants = {
  enter: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -70 },
  exit: { opacity: 0, x: 70, transition: { ease: 'easeInOut' } },
};

const MotionSession = motion.custom(UserSessionRow);

export default function PlanningPokerSession({ sessionId }: PlanningPokerSessionProps) {
  const { userId, isLoadingAuth } = useAuth();

  const router = useRouter();

  const {
    loading: loadingSession,
    data: { poker_session_by_pk: session } = {},
  } = useGetPokerSessionSubscription({
    variables: { id: sessionId },
  });

  const sessionLoaded = !!session;

  const [joinSession, { loading: joiningSession }] = useUpsetUserSessionMutation();
  useEffect(() => {
    if (!userId || !sessionLoaded) return;
    joinSession({ variables: { sessionId, userId } });
  }, [userId, sessionLoaded]);

  const voters = useMemo(
    () =>
      sessionLoaded ? session.user_sessions.filter(us => us.is_observer === false) : [],
    [session],
  );

  const observers = useMemo(
    () =>
      sessionLoaded ? session.user_sessions.filter(us => us.is_observer === true) : [],
    [session],
  );

  const currentUserSession = useMemo(
    () =>
      sessionLoaded
        ? session.user_sessions.find(us => us.user.id === userId) ?? null
        : null,
    [session],
  );

  if (loadingSession || isLoadingAuth || joiningSession)
    return (
      <Loading
        text={joiningSession ? 'Joining Session' : 'Loading Session'}
        delay={300}
      />
    );

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

  const isSessionOwner = session.owner_id === userId;

  const currentVoteCount = voters.filter(us => us.current_vote !== null).length;

  const voterCount = voters.length;

  return (
    <Box maxWidth={[9]} margin="0 auto">
      <Head>
        <title>{session.name}</title>
      </Head>
      <Text as="h2" fontWeight="400" fontSize={[3, 4, 5]}>
        Planning Poker &gt; {session.name}
      </Text>
      {isSessionOwner && (
        <SessionOwnerControls
          sessionId={session.id}
          userCount={voterCount}
          currentVoteCount={currentVoteCount}
          votesVisible={session.votes_visible}
          allowRevotes={session.allow_revotes}
        />
      )}

      <VoterControls
        sessionId={sessionId}
        votesVisible={session.votes_visible}
        allowRevotes={session.allow_revotes}
        isObserver={currentUserSession && currentUserSession.is_observer}
      />

      <Flex
        mb={[3, 4]}
        justifyContent="space-between"
        flexDirection={['column', , 'row']}
      >
        <Card mr={[0, , 3]} mb={[4, 4, 0]} title="Votes" spacingVariant="cosy">
          <AnimatePresence initial={false}>
            {voters.flatMap(userSession => (
              <MotionSession
                variants={motionItemVariants}
                initial="hidden"
                animate="enter"
                exit="exit"
                key={userSession.user.id}
                sessionId={session.id}
                votesVisible={session.votes_visible}
                userSession={userSession}
                showUserMenu={isSessionOwner}
              />
            ))}
          </AnimatePresence>
        </Card>
        <Flex flexDirection="column">
          <Box mb={[4]}>
            <SessionStats {...(session as Poker_Session)} />
          </Box>
          <SessionObservers
            sessionId={session.id}
            observers={observers}
            showUserMenu={isSessionOwner}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
