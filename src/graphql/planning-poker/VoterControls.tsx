import { useState, useEffect } from 'react';
import { fontSize, FontSizeProps } from 'styled-system';
import styled from 'styled-components';

import Box from '@styled/Box';
import { getColor, getFont } from '@styled/theme';
import Spaced from '@styled/Spaced';

import PlanningPokerVoter from './PlanningPokerVoter';
import PlanningPokerReactor from './PlanningPokerReactor';
import { AnimatePresence, motion } from 'framer-motion';
import { toPairs, keysIn, pipe, filter } from 'ramda';

type ControlType = 'react' | 'vote';

interface ControlTabDefinition {
  text: string;
  content: React.ReactNode;
  isAllowed?: boolean;
}

interface ControlTabButtonProps {
  isActive?: boolean;
}

const ControlTabButton = styled.button<ControlTabButtonProps & FontSizeProps>`
  cursor: pointer;
  border: none;
  background: transparent;
  font-family: ${getFont('normal')};

  border-bottom: 5px solid transparent;

  color: ${getColor('neutralDark')};

  border-color: ${p => (p.isActive ? getColor('primary') : 'transparent')};

  :focus {
    outline: none;
  }

  :hover {
    border-color: ${getColor('neutralMid')};
  }

  ${fontSize};
`;

ControlTabButton.defaultProps = {
  fontSize: [3, 4],
};

interface VoterControlsProps {
  sessionId: number;
  votesVisible: boolean;
  allowRevotes: boolean;
  isObserver: boolean;
}

export default function VoterControls({
  sessionId,
  votesVisible,
  allowRevotes,
  isObserver,
}: VoterControlsProps) {
  const [voterDisplay, setVoterDisplay] = useState<ControlType>(
    votesVisible ? 'react' : 'vote',
  );

  useEffect(
    () => setVoterDisplay(isObserver ? 'react' : votesVisible ? 'react' : 'vote'),
    [votesVisible, isObserver],
  );

  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const canVote = !isObserver && (allowRevotes || !votesVisible);

  const tabs: Record<ControlType, ControlTabDefinition> = {
    vote: {
      isAllowed: !isObserver,
      text: 'Vote',
      content: (
        <PlanningPokerVoter
          sessionId={sessionId}
          allowVoting={canVote}
          isRevoting={votesVisible}
        />
      ),
    },
    react: {
      text: 'React',
      content: <PlanningPokerReactor sessionId={sessionId} />,
    },
  };
  const handleTabClick = (clicked: ControlType) => {
    const tabKeys = keysIn(tabs) as ControlType[];
    const previousIndex = tabKeys.indexOf(voterDisplay);
    const nextIndex = tabKeys.indexOf(clicked);

    setDirection(nextIndex > previousIndex ? 'right' : 'left');
    setVoterDisplay(clicked);
  };

  const directionMult = direction === 'right' ? -1 : 1;

  const renderableTabs = pipe(
    (t: Record<ControlType, ControlTabDefinition>) =>
      toPairs(t) as [ControlType, ControlTabDefinition][],
    filter(([_, def]) => def.isAllowed !== false),
  )(tabs);

  return (
    <Box my={[4]}>
      <Box my={[1, 2]} role="tablist">
        <Spaced mr={[2, 3]}>
          {renderableTabs.map(([type, def]) => (
            <ControlTabButton
              key={type}
              isActive={voterDisplay === type}
              role="tab"
              onClick={() => handleTabClick(type)}
            >
              {def.text}
            </ControlTabButton>
          ))}
        </Spaced>
      </Box>
      <Box position="relative">
        <AnimatePresence initial={false} exitBeforeEnter={true}>
          <motion.div
            key={voterDisplay}
            transition={{
              ease: 'easeInOut',
            }}
            initial={{ x: 10 * directionMult, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 10 * directionMult, opacity: 0 }}
          >
            {tabs[voterDisplay].content}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
