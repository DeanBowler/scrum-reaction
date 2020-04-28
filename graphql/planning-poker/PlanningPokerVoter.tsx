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

const CARD_SIZES = [
  { value: '0' },
  { value: '1' },
  { value: '2' },
  { value: '3' },
  { value: '5' },
  { value: '8' },
  { value: '13' },
  { value: '20' },
  { value: '?' },
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
      <Text as="h3">Submit your vote</Text>
      <Flex
        flexWrap="wrap"
        justifyContent={['center', 'unset']}
        // opacity={allowVoting ? 1 : 0.5}
      >
        <Spaced margin={[1, 2]}>
          {CARD_SIZES.map(c => (
            <PlanningPokerVoteCard
              key={c.value}
              value={c.value}
              label={c.value}
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
}

const StyledVoteCard: React.FunctionComponent<BorderBoxProps> = styled(BorderBox)`
  cursor: pointer;
  color: ${p => p.theme.colors.neutralDark};
  background: ${p => p.theme.colors.neutralLightest};
  border: 1px solid ${p => p.theme.colors.neutralMid};
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 0px -1px;
  :hover {
    background: ${p => p.theme.colors.neutralLight};
  }
`;

const PlanningPokerVoteCard = ({
  value,
  label,
  onClick,
  className,
}: PlanningPokerVoteCardProps) => (
  <StyledVoteCard
    className={className}
    key={value}
    as="button"
    textAlign="center"
    onClick={() => onClick(value)}
    fontSize={[3, 5]}
    minWidth={[3, 4]}
    minHeight={[3, 4]}
    fontFamily="Pacifico"
    flex="0 0"
  >
    {label}
  </StyledVoteCard>
);
