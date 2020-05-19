import { keys } from 'ramda';
import gql from 'graphql-tag';

import { useUpdateReactionMutation } from '@generated/graphql';

import { useAuth } from '@contexts/authContext';
import Card from '@components/Card';
import Box from '@styled/Box';
import Flex from '@styled/Flex';
import Spaced from '@styled/Spaced';
import Text from '@styled/Text';
import Button from '@styled/Button';

export const UPDATE_REACTION = gql`
  mutation updateReaction($sessionId: Int!, $userId: String!, $reaction: String) {
    update_poker_user_session(
      where: { session_id: { _eq: $sessionId }, user_id: { _eq: $userId } }
      _set: { current_reaction: $reaction }
    ) {
      affected_rows
    }
  }
`;

type Reaction = 'thumbsup' | 'thumbsdown' | 'yay' | 'thinking' | 'chat' | 'whoops' | null;

const REACTIONS: { [key in Reaction]: string } = {
  yay: '🎉',
  thumbsup: '👍',
  thumbsdown: '👎',
  chat: '💬',
  thinking: '🤔',
  whoops: '🤕',
};

export const ReactionIcon = ({ reaction }: { reaction: string }) => (
  <Text as="div" lineHeight="solid" fontSize={[2, 3, 4]}>
    {REACTIONS[reaction]}
  </Text>
);

const reactionKeys = keys(REACTIONS);

interface ReactionCardProps {
  reaction: Reaction;
  onClick(reaction: Reaction): void;
  className?: string;
}

function ReactionCard({ reaction, onClick, className }: ReactionCardProps) {
  return (
    <Card
      as="button"
      variant="link"
      spacingVariant="narrow"
      flex="0 0"
      my={[1, 2]}
      height={[3, 4]}
      p={0}
      onClick={() => onClick(reaction)}
      className={className}
    >
      <Text fontSize={[4, 5]}>{REACTIONS[reaction]}</Text>
    </Card>
  );
}

interface PlanningPokerReactorProps {
  sessionId: number;
}

export default function PlanningPokerReactor({ sessionId }: PlanningPokerReactorProps) {
  const { userId } = useAuth();

  const [update] = useUpdateReactionMutation();

  const handleReactionClick = (reaction: Reaction) =>
    update({
      variables: {
        sessionId,
        userId,
        reaction,
      },
    });

  return (
    <Box as="section">
      <Flex flexWrap="wrap" alignItems="flex-end" justifyContent={['center', 'unset']}>
        <Spaced mr={[1, 3]} includeLast={false}>
          {reactionKeys.map(r => (
            <ReactionCard key={r} reaction={r} onClick={handleReactionClick} />
          ))}
          <Button ml={[1, 2]} my={[1, 2]} onClick={() => handleReactionClick(null)}>
            Clear
          </Button>
        </Spaced>
      </Flex>
    </Box>
  );
}
