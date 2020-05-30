import gql from 'graphql-tag';
import styled from 'styled-components';

import { useAuth } from '@contexts/authContext';
import { useUpdateVoteMutation, useUpdateRevoteMutation } from '@generated/graphql';
import Box from '@styled/Box';
import BorderBox, { BorderBoxProps } from '@styled/BorderBox';
import Spaced from '@styled/Spaced';
import Flex from '@styled/Flex';
import { getColor } from '@styled/theme';

export const UPDATE_VOTE = gql`
  mutation updateVote($sessionId: Int!, $userId: String!, $vote: String) {
    update_poker_user_session(
      where: {
        session_id: { _eq: $sessionId }
        user_id: { _eq: $userId }
        poker_session: { votes_visible: { _eq: false } }
      }
      _set: { current_vote: $vote }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_REVOTE = gql`
  mutation updateRevote($sessionId: Int!, $userId: String!, $vote: String) {
    update_poker_user_session(
      where: {
        session_id: { _eq: $sessionId }
        user_id: { _eq: $userId }
        poker_session: {
          _and: { allow_revotes: { _eq: true }, votes_visible: { _eq: true } }
        }
      }
      _set: { current_revote: $vote }
    ) {
      affected_rows
    }
  }
`;

interface PlanningPokerVoterProps {
  sessionId: number;
  allowVoting: boolean;
  isRevoting: boolean;
}

export const UNKNOWN_VALUE = '?';

type CardSize = { value: string; label?: string };

const CARD_SIZES: readonly CardSize[] = [
  { value: '0' },
  { value: '0.5', label: '1/2' },
  { value: '1' },
  { value: '2' },
  { value: '3' },
  { value: '5' },
  { value: '8' },
  { value: '13' },
  { value: '20' },
  { value: UNKNOWN_VALUE },
];

export default function PlanningPokerVoter({
  sessionId,
  allowVoting,
  isRevoting,
}: PlanningPokerVoterProps) {
  const { userId } = useAuth();

  const [update] = useUpdateVoteMutation();
  const [updateRevote] = useUpdateRevoteMutation();

  const submitVote = (vote: string | null) => {
    if (!allowVoting) return;

    if (!isRevoting) {
      update({ variables: { sessionId, userId, vote } });
    } else {
      updateRevote({ variables: { sessionId, userId, vote } });
    }
  };

  return (
    <Box as="section">
      <Flex flexWrap="wrap" justifyContent={['center', 'unset']}>
        <Spaced mr={[1, 3]} includeLast={false}>
          {CARD_SIZES.map(c => (
            <PlanningPokerVoteCard
              key={c.value}
              disabled={!allowVoting}
              value={c.value}
              label={c.label || c.value}
              onClick={submitVote}
            />
          ))}
        </Spaced>
      </Flex>
    </Box>
  );
}

interface PlanningPokerVoteCardProps {
  value: string;
  label: string;
  onClick(value: string): void;
  className?: string;
  disabled: boolean;
}

const StyledVoteCard: React.FunctionComponent<BorderBoxProps> = styled(BorderBox)`
  cursor: pointer;
  color: ${getColor('neutralDark')};
  background: ${getColor('neutralLightest')};
  border: 1px solid ${getColor('neutralMid')};
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 0px -1px;
  line-height: 1rem;

  transform: translateY(0);
  transition: background 300ms ease-in-out, transform 200ms, box-shadow 100ms;

  :hover {
    transform: translateY(-3px);
    box-shadow: 0px 8px 0px -2px rgba(0, 0, 0, 0.1);
  }

  :active {
    box-shadow: 0px 5px 0px -1px rgba(0, 0, 0, 0.1);
  }

  :disabled {
    cursor: not-allowed;
    background: ${getColor('neutralLight')};
  }

  :focus {
    outline: none;
    border-color: ${getColor('primary')};
  }
`;

const PlanningPokerVoteCard = ({
  value,
  label,
  onClick,
  className,
  disabled,
}: PlanningPokerVoteCardProps) => (
  <StyledVoteCard
    className={className}
    key={value}
    as="button"
    textAlign="center"
    onClick={() => onClick(value)}
    fontSize={[4, 5]}
    my={[1, 2]}
    minWidth={[3, 4]}
    height={[3, 4]}
    fontFamily="cursive"
    flex="0 0"
    disabled={disabled}
  >
    {label}
  </StyledVoteCard>
);
