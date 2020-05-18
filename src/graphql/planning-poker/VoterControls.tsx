import { useState, useEffect } from 'react';
import { fontSize, FontSizeProps } from 'styled-system';
import styled from 'styled-components';

import Box from '@styled/Box';
import { getColor } from '@styled/theme';
import Spaced from '@styled/Spaced';

import PlanningPokerVoter from './PlanningPokerVoter';
import PlanningPokerReactor from './PlanningPokerReactor';
import { AnimatePresence, motion } from 'framer-motion';

type VoterDisplay = 'react' | 'vote';

interface VoterControlsProps {
  sessionId: number;
  votesVisible: boolean;
}

interface DisplayTabButtonProps {
  isActive?: boolean;
}

const DisplayTabButton = styled.button<DisplayTabButtonProps & FontSizeProps>`
  cursor: pointer;
  border: none;
  background: transparent;
  font-family: 'Raleway';

  border-bottom: 5px solid transparent;

  border-color: ${p => (p.isActive ? getColor('primary') : 'transparent')};

  :focus {
    outline: none;
  }

  :hover {
    border-color: ${getColor('neutralMid')};
  }

  ${fontSize};
`;

DisplayTabButton.defaultProps = {
  fontSize: [2, 3],
};

export default function VoterControls({ sessionId, votesVisible }: VoterControlsProps) {
  const [voterDisplay, setVoterDisplay] = useState<VoterDisplay>('vote');
  useEffect(() => setVoterDisplay(votesVisible ? 'react' : 'vote'), [votesVisible]);

  return (
    <Box my={[4]}>
      <Box my={[1, 2]}>
        <Spaced mr={[2, 3]}>
          <DisplayTabButton
            isActive={voterDisplay === 'vote'}
            role="tab"
            onClick={() => setVoterDisplay('vote')}
          >
            Vote
          </DisplayTabButton>
          <DisplayTabButton
            isActive={voterDisplay === 'react'}
            role="tab"
            onClick={() => setVoterDisplay('react')}
          >
            React
          </DisplayTabButton>
        </Spaced>
      </Box>
      <Box position="relative">
        <AnimatePresence initial={false} exitBeforeEnter={true}>
          <motion.div
            key={voterDisplay}
            transition={{
              ease: 'easeInOut',
            }}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 10, opacity: 0 }}
          >
            {voterDisplay === 'vote' && (
              <PlanningPokerVoter sessionId={sessionId} allowVoting={!votesVisible} />
            )}
            {voterDisplay === 'react' && <PlanningPokerReactor sessionId={sessionId} />}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
