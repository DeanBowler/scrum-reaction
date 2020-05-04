import React from 'react';
import gql from 'graphql-tag';

import { useClearVotesMutation, useShowVotesMutation } from '@generated/graphql';
import Box from '@styled/Box';
import Flex from '@styled/Flex';
import Text from '@styled/Text';
import Button from '@styled/Button';
import Spaced from '@styled/Spaced';

export const CLEAR_VOTES = gql`
  mutation clearVotes($sessionId: Int!) {
    update_poker_user_session(
      where: { poker_session: { id: { _eq: $sessionId } } }
      _set: { current_vote: null, current_reaction: null }
    ) {
      affected_rows
    }
    update_poker_session(
      where: { user_sessions: {}, id: { _eq: $sessionId } }
      _set: { votes_visible: false }
    ) {
      affected_rows
    }
  }
`;

export const SHOW_VOTES = gql`
  mutation showVotes($sessionId: Int!) {
    update_poker_session(
      where: { id: { _eq: $sessionId } }
      _set: { votes_visible: true }
    ) {
      affected_rows
    }
  }
`;

export interface SessionOwnerControlsProps {
  sessionId: number;
}

export default function SessionOwnerControls({ sessionId }: SessionOwnerControlsProps) {
  const [clearVotes] = useClearVotesMutation({ variables: { sessionId } });
  const [showVotes] = useShowVotesMutation({ variables: { sessionId } });

  return (
    <Box as="section" my={[2, 4]}>
      <Text as="h3" letterSpacing="tracked">
        Control
      </Text>
      <Flex flexWrap="wrap" justifyContent={['center', 'unset']}>
        <Spaced mr={[1, 2, 3]} includeLast={false}>
          <Button onClick={() => clearVotes()}>Clear Votes</Button>
          <Button onClick={() => showVotes()}>Show Votes</Button>
        </Spaced>
      </Flex>
    </Box>
  );
}
