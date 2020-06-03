import React from 'react';

import { Users, PokerUserSessionInfoFragment } from '@generated/graphql';
import { FaEyeSlash, FaCrown } from 'react-icons/fa';
import styled from 'styled-components';
import { Variants, AnimatePresence, motion } from 'framer-motion';

import { useAuth } from '@contexts/authContext';
import Flex from '@styled/Flex';
import Box from '@styled/Box';
import Text from '@styled/Text';

import SessionUserMenu from './SessionUserMenu';
import AnimatedReaction from './AnimatedReaction';

interface UserSessionProps {
  sessionId: number;
  showUserMenu: boolean;
  votesVisible: boolean;
  userSession: PokerUserSessionInfoFragment;
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
  ({ sessionId, userSession, showUserMenu, votesVisible }: UserSessionProps, ref) => {
    const { userId } = useAuth();

    const {
      user,
      current_reaction,
      current_vote,
      current_revote,
      is_observer,
    } = userSession;

    const isVoteVisible = votesVisible || user.id === userId;
    const hasRevoted = current_revote !== null;

    return (
      <StyledUserSessionContainer
        ref={ref}
        height={2}
        py={is_observer ? [1] : [1, 2]}
        alignItems="center"
      >
        <Box flex="0 0" minWidth={[1, 2]} mr={[1, , 2]} position="relative">
          <AnimatedReaction reaction={current_reaction} />
        </Box>
        <Flex flex="1 1" pl={1}>
          <Text fontSize={is_observer ? [1, 2] : [2, 3]}>{user.name}</Text>
        </Flex>
        {!is_observer && (
          <Flex flex="0 0" pr={[2, 3]} justifyContent="end" alignItems="center">
            <MotionBox
              positionTransition={({ delta }) =>
                votesVisible && !!delta.x ? { type: 'spring' } : { type: false }
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
        )}

        {showUserMenu && (
          <SessionUserMenu
            userId={user.id}
            sessionId={sessionId}
            isObserver={is_observer}
          />
        )}
      </StyledUserSessionContainer>
    );
  },
);

export default UserSessionRow;
