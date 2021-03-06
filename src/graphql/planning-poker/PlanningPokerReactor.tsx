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

type Reaction =
  | 'thumbsup'
  | 'thumbsdown'
  | 'yay'
  | 'thinking'
  | 'chat'
  | 'whoops'
  | 'breaktime';

const REACTIONS: Record<Reaction, string> = {
  yay: '🎉',
  thumbsup: '👍',
  thumbsdown: '👎',
  chat: '💬',
  thinking: '🤔',
  whoops: '🤕',
  breaktime: '☕',
};

function isValidReaction(reaction: string | null | undefined): reaction is Reaction {
  return Boolean(reaction && reaction in REACTIONS);
}

export const ReactionIcon = ({ reaction }: { reaction: string | null | undefined }) => (
  <Text as="div" lineHeight="solid" fontSize={[3, 4]}>
    {isValidReaction(reaction) ? REACTIONS[reaction] : ''}
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
      <Text fontSize={[4, 5]}>
        {isValidReaction(reaction) ? REACTIONS[reaction] : '⚠'}
      </Text>
    </Card>
  );
}

interface PlanningPokerReactorProps {
  sessionId: number;
}

export default function PlanningPokerReactor({ sessionId }: PlanningPokerReactorProps) {
  const { userId = '' } = useAuth();

  const [update] = useUpdateReactionMutation();

  const handleReactionClick = (reaction: Reaction | null) =>
    update({
      variables: {
        sessionId,
        userId,
        reaction,
      },
    });

  return (
    <Box as="section">
      <Flex flexWrap="wrap" justifyContent={['center', 'unset']}>
        <Spaced mr={[1, 3]} includeLast={false}>
          {reactionKeys.map(r => (
            <ReactionCard key={r} reaction={r} onClick={handleReactionClick} />
          ))}
          <Button
            my={[1, 2]}
            px={[2, 3]}
            py={[1, 2]}
            variant="outline"
            onClick={() => handleReactionClick(null)}
          >
            <Text lineHeight="solid">
              Clear <br />
              Reaction
            </Text>
          </Button>
        </Spaced>
      </Flex>
    </Box>
  );
}
