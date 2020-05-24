import React from 'react';

import { Users } from '@generated/graphql';
import { FaEyeSlash } from 'react-icons/fa';
import styled from 'styled-components';
import { Variants, AnimatePresence, motion } from 'framer-motion';

import { useAuth } from '@contexts/authContext';
import Flex from '@styled/Flex';
import Box from '@styled/Box';
import Text from '@styled/Text';

import { ReactionIcon } from './PlanningPokerReactor';
import SessionUserMenu from './SessionUserMenu';

interface UserSessionProps {
  user: Pick<Users, 'id' | 'name'>;
  sessionId: number;
  showUserMenu: boolean;
  currentVote: string | number | null;
  currentRevote: string | null;
  currentReaction: string | null;
  votesVisible: boolean;
}

const StyledUserSessionContainer = styled(Flex)`
  border-radius: 5px;
`;

const reactionMotions: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
    },
  },
  exit: {
    opacity: 0,
  },
  hidden: {
    y: -15,
    opacity: 0,
  },
};

const StyledVoteText = styled(Text)`
  transition: font-size 200ms ease-in-out 300ms, color 300ms ease-in-out 300ms;
`;

const MotionBox = motion.custom(Box);

const UserSessionRow = React.forwardRef(
  (
    {
      user,
      sessionId,
      currentVote: current_vote,
      currentRevote: current_revote,
      currentReaction: current_reaction,
      showUserMenu,
      votesVisible: votes_visible,
    }: UserSessionProps,
    ref,
  ) => {
    const { userId } = useAuth();

    const isVoteVisible = votes_visible || user.id === userId;
    const hasRevoted = current_revote !== null;

    return (
      <StyledUserSessionContainer ref={ref} py={[1, 2]} alignItems="center">
        <Box flex="0 0" minWidth={[1, 2]} mr={[1, , 2]} position="relative">
          <AnimatePresence initial={false} exitBeforeEnter>
            <motion.div
              key={current_reaction}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={reactionMotions}
            >
              <ReactionIcon fontSize={[2, 3, 4]} reaction={current_reaction} />
            </motion.div>
          </AnimatePresence>
        </Box>
        <Box flex="1 1" pl={[1, 2]}>
          <Text fontSize={[1, 2, 3]}>{user.name}</Text>
        </Box>
        <Flex flex="0 0" pr={[2, 3]} justifyContent="end" alignItems="center">
          <MotionBox
            positionTransition={({ delta }) =>
              votes_visible && !!delta.x ? { type: 'spring' } : { type: false }
            }
            minWidth={3}
            textAlign="center"
            flex="0 0"
          >
            <StyledVoteText
              fontSize={!hasRevoted ? [3, 4] : [2, 3]}
              fontWeight="bold"
              color={!hasRevoted ? 'neutralDarker' : 'neutralMidDark'}
            >
              {current_vote ? isVoteVisible ? current_vote : <FaEyeSlash /> : ' '}
            </StyledVoteText>
          </MotionBox>
          <AnimatePresence initial={false} exitBeforeEnter>
            {hasRevoted && (
              <MotionBox
                key={current_revote}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={reactionMotions}
                minWidth={3}
                textAlign="center"
              >
                <Box>
                  <Text fontSize={[3, 4]} fontWeight="bold" color="secondary">
                    {current_revote}
                  </Text>
                </Box>
              </MotionBox>
            )}
          </AnimatePresence>
        </Flex>

        {showUserMenu && <SessionUserMenu userId={user.id} sessionId={sessionId} />}
      </StyledUserSessionContainer>
    );
  },
);

export default UserSessionRow;
