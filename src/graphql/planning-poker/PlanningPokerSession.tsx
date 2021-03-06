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
import { useDeltaChange } from '@hooks/useDelta';
import { useToast } from '@components/Toast';
import { ReactionIcon } from './PlanningPokerReactor';
import isEmpty from '@utils/isEmpty';
import SessionMenu from './SessionMenu';

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
      auto_reveal
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

  const { raiseToast } = useToast();

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
    () => session?.user_sessions.filter(us => us.is_observer === false) ?? [],
    [session],
  );

  const observers = useMemo(
    () => session?.user_sessions.filter(us => us.is_observer === true) ?? [],
    [session],
  );

  const currentUserSession = useMemo(
    () => session?.user_sessions.find(us => us.user.id === userId) ?? null,
    [session],
  );

  useDeltaChange(currentUserSession?.is_observer, ({ current, previous }) => {
    if (isEmpty(previous)) return;
    raiseToast(`You're now ${current ? 'an observer' : 'a voter'}`);
  });

  const isSessionOwner = session && session.owner_id === userId;

  useDeltaChange(isSessionOwner, ({ current, previous }) => {
    if (isEmpty(previous)) return;
    raiseToast(`You're ${current ? 'now' : 'no longer'} the session owner`);
  });

  const uniqueReactions = useMemo(
    () => new Set(session?.user_sessions.map(v => v.current_reaction)),
    [session],
  );

  useDeltaChange(uniqueReactions.size, ({ previous }) => {
    if (!previous || !session?.user_sessions[0].current_reaction) return;

    if (uniqueReactions.size === 1) {
      raiseToast(
        <Flex>
          <Text mr={1}>Everyone reacted</Text>{' '}
          <ReactionIcon reaction={session?.user_sessions[0].current_reaction} />
        </Flex>,
      );
    }
  });

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

  const currentVoteCount = voters.filter(us => us.current_vote !== null).length;

  const voterCount = voters.length;

  return (
    <Box maxWidth={[9]} margin="0 auto">
      <Head>
        <title>{session.name}</title>
      </Head>
      <Flex justifyContent="space-between" alignItems="baseline" my={[2, 4]}>
        <Text as="h2" m={0} fontWeight="400" fontSize={[3, 4, 5]}>
          Planning Poker &gt; {session.name}
        </Text>
        {isSessionOwner && (
          <SessionMenu
            sessionId={session.id}
            allowRevotes={session.allow_revotes}
            autoReveal={session.auto_reveal}
          />
        )}
      </Flex>
      {isSessionOwner && (
        <SessionOwnerControls
          sessionId={session.id}
          userCount={voterCount}
          currentVoteCount={currentVoteCount}
          votesVisible={session.votes_visible}
          autoReveal={session.auto_reveal}
        />
      )}

      <VoterControls
        sessionId={sessionId}
        votesVisible={session.votes_visible}
        allowRevotes={session.allow_revotes}
        isObserver={currentUserSession?.is_observer ?? false}
      />

      <Flex
        mb={[3, 4]}
        justifyContent="space-between"
        flexDirection={['column', 'column', 'row']}
      >
        <Card mr={[0, 0, 3]} mb={[4, 4, 0]} title="Votes" spacingVariant="cosy">
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
                isSessionOwner={userSession.user.id === session.owner_id}
                showUserMenu={isSessionOwner ?? false}
              />
            ))}
          </AnimatePresence>
        </Card>
        <Flex flexDirection="column">
          <Box mb={[4]}>
            <SessionStats {...(session as Poker_Session)} />
          </Box>
          <SessionObservers
            sessionOwnerId={session.owner_id}
            sessionId={session.id}
            observers={observers}
            showUserMenu={isSessionOwner ?? false}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
