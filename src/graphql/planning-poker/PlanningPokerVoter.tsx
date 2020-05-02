import gql from 'graphql-tag';
import { useAuth } from '../../contexts/authContext';
import { useUpdateVoteMutation } from '../../generated/graphql';
import styled from 'styled-components';
import Box from '../../styled/Box';
import BorderBox, { BorderBoxProps } from '../../styled/BorderBox';
import Spaced from '../../styled/Spaced';
import Flex from '../../styled/Flex';
import Text from '../../styled/Text';

export const UPDATE_VOTE = gql`
  mutation updateVote($sessionId: Int!, $userId: String!, $vote: String) {
    update_poker_user_session(
      where: { session_id: { _eq: $sessionId }, user_id: { _eq: $userId } }
      _set: { current_vote: $vote }
    ) {
      affected_rows
    }
  }
`;

interface PlanningPokerVoterProps {
  sessionId: number;
  allowVoting: boolean;
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
}: PlanningPokerVoterProps) {
  const { userId } = useAuth();

  const [update] = useUpdateVoteMutation();

  const submitVote = (vote: string | null) =>
    allowVoting && update({ variables: { sessionId, userId, vote } });

  return (
    <Box as="section" my={[2, 4]}>
      <Text as="h3">{allowVoting ? 'Submit your vote' : 'Voting locked'}</Text>
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
  color: ${p => p.theme.colors.neutralDark};
  background: ${p => p.theme.colors.neutralLightest};
  border: 1px solid ${p => p.theme.colors.neutralMid};
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 0px -1px;

  :disabled {
    cursor: not-allowed;
    background: ${p => p.theme.colors.neutralLight};
  }

  :hover:not(:disabled) {
    background: ${p => p.theme.colors.neutralLight};
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
    minHeight={[3, 4]}
    fontFamily="Pacifico"
    flex="0 0"
    disabled={disabled}
  >
    {label}
  </StyledVoteCard>
);