import React, { useEffect } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/router';

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

import PlanningPokerVoter from './PlanningPokerVoter';
import SessionStats from './SessionStats';
import SessionOwnerControls from './SessionOwnerControls';
import SessionUserMenu from './SessionUserMenu';
import { AnimatePresence, motion, Variants } from 'framer-motion';

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
          id
        }
      }
    }
  }
`;

const StyledUserSessionContainer = styled(Flex)`
  border-radius: 5px;

  :hover {
    /* background: ${p => p.theme.colors.neutralLight}; */
  }
`;

interface UserSessionProps {
  user: Pick<Users, 'id' | 'name'>;
  sessionId: number;
  showUserMenu: boolean;
  current_vote: string | number;
  votes_visible: boolean;
}

function UserSession({
  user,
  sessionId,
  current_vote,
  showUserMenu,
  votes_visible,
}: UserSessionProps) {
  const { userId } = useAuth();

  const isVoteVisible = votes_visible || user.id === userId;

  return (
    <StyledUserSessionContainer py={[1, 2]} alignItems="baseline">
      <Box pl={[1, 2]} flex="1 1">
        <Text fontSize={[1, 2, 3]}>{user.name}</Text>
      </Box>
      <Box pr={[1, 2]} width={3} flex="0 0" mx={[1, 2]}>
        <Text fontSize={[3, 4]} fontWeight="bold">
          {' '}
          {current_vote ? isVoteVisible ? current_vote : <FaEyeSlash /> : '-'}{' '}
        </Text>
      </Box>

      {showUserMenu && <SessionUserMenu userId={user.id} sessionId={sessionId} />}
    </StyledUserSessionContainer>
  );
}

interface PlanningPokerSessionProps {
  sessionId: number;
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

  const isSessionOwner = session.owner_id === userId;

  const motionItemVariants: Variants = {
    enter: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -70 },
    exit: { opacity: 0, x: 70, transition: { ease: 'easeInOut' } },
  };

  return (
    <Box maxWidth={[9]} margin="0 auto">
      <Head>
        <title>{session.name}</title>
      </Head>
      <Text as="h2" fontWeight="400" fontSize={[3, 4, 5]}>
        Planning Poker > {session.name}
      </Text>
      {isSessionOwner && <SessionOwnerControls sessionId={session.id} />}
      <PlanningPokerVoter sessionId={sessionId} allowVoting={!session.votes_visible} />
      <Flex justifyContent="space-between" flexDirection={['column', 'row']}>
        <Card title="Votes">
          <AnimatePresence initial={false}>
            {session.user_sessions.flatMap(us => (
              <motion.div
                key={us.user.id}
                variants={motionItemVariants}
                initial="hidden"
                animate="enter"
                exit="exit"
              >
                <UserSession
                  showUserMenu={isSessionOwner}
                  key={us.user.id}
                  user={us.user}
                  sessionId={session.id}
                  current_vote={us.current_vote}
                  votes_visible={session.votes_visible}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </Card>
        <SessionStats {...(session as Poker_Session)} />
      </Flex>
    </Box>
  );
}
