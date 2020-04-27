import React from 'react';
import gql from 'graphql-tag';
import Box from '../../styled/Box';
import Flex from '../../styled/Flex';
import Text from '../../styled/Text';
import Button from '../../styled/Button';
import Spaced from '../../styled/Spaced';
import { useClearScoresMutation } from '../../generated/graphql';

export const CLEAR_SCORES = gql`
  mutation clearScores($sessionId: Int!) {
    update_poker_user_session(
      where: { poker_session: { id: { _eq: $sessionId } } }
      _set: { current_vote: null }
    ) {
      affected_rows
    }
  }
`;

export interface SessionOwnerControlsProps {
  sessionId: number;
}

export default function SessionOwnerControls({ sessionId }: SessionOwnerControlsProps) {
  const [clearScores] = useClearScoresMutation({ variables: { sessionId } });

  return (
    <Box as="section" my={[2, 4]}>
      <Text as="h3">Session Controls</Text>
      <Flex flexWrap="wrap" justifyContent={['center', 'unset']}>
        <Spaced mr={[1, 2, 3]} includeLast={false}>
          <Button onClick={() => clearScores()}>Clear Scores</Button>
        </Spaced>
      </Flex>
    </Box>
  );
}
