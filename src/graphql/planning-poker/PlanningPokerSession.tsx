import React, { useEffect } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { AnimatePresence, motion, Variants } from 'framer-motion';

import {
  useGetPokerSessionSubscription,
  useUpsetUserSessionMutation,
  Poker_Session,
  Users,
} from '@generated/graphql';

import { useAuth } from '@contexts/authContext';
import Card from '@components/Card';
import Text from '@styled/Text';
import Box from '@styled/Box';
import Flex from '@styled/Flex';
import Button from '@styled/Button';

import SessionStats from './SessionStats';
import SessionOwnerControls from './SessionOwnerControls';
import VoterControls from './VoterControls';
import UserSessionRow from './UserSessionRow';

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
        current_vote
        current_revote
        current_reaction
        user {
          name
          id
        }
      }
    }
  }
`;

interface PlanningPokerSessionProps {
  sessionId: number;
}

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

  const isSessionOwner = session.owner_id === userId;

  const motionItemVariants: Variants = {
    enter: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -70 },
    exit: { opacity: 0, x: 70, transition: { ease: 'easeInOut' } },
  };

  const currentVoteCount = session.user_sessions.filter(us => us.current_vote !== null)
    .length;

  const userCount = session.user_sessions.length;

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
          userCount={userCount}
          currentVoteCount={currentVoteCount}
          votesVisible={session.votes_visible}
          allowRevotes={session.allow_revotes}
        />
      )}

      <VoterControls
        sessionId={sessionId}
        votesVisible={session.votes_visible}
        allowRevotes={session.allow_revotes}
      />

      <Flex justifyContent="space-between" flexDirection={['column', , 'row']}>
        <Card title="Votes" spacingVariant="cosy">
          <AnimatePresence initial={false}>
            {session.user_sessions.flatMap(us => (
              <MotionSession
                variants={motionItemVariants}
                initial="hidden"
                animate="enter"
                exit="exit"
                showUserMenu={isSessionOwner}
                key={us.user.id}
                user={us.user}
                sessionId={session.id}
                currentRevote={us.current_revote}
                currentVote={us.current_vote}
                currentReaction={us.current_reaction}
                votesVisible={session.votes_visible}
              />
            ))}
          </AnimatePresence>
        </Card>
        <SessionStats {...(session as Poker_Session)} />
      </Flex>
    </Box>
  );
}
