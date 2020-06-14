import React from 'react';
import gql from 'graphql-tag';

import { useClearVotesMutation, useShowVotesMutation } from '@generated/graphql';
import Box from '@styled/Box';
import Flex from '@styled/Flex';
import Button from '@styled/Button';
import Spaced from '@styled/Spaced';

export const CLEAR_VOTES = gql`
  mutation clearVotes($sessionId: Int!) {
    update_poker_user_session(
      where: { poker_session: { id: { _eq: $sessionId } } }
      _set: { current_vote: null, current_reaction: null, current_revote: null }
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
  votesVisible: boolean;
  userCount: number;
  currentVoteCount: number;
}

export default function SessionOwnerControls({
  sessionId,
  votesVisible,
  userCount,
  currentVoteCount,
}: SessionOwnerControlsProps) {
  const [clearVotes] = useClearVotesMutation({ variables: { sessionId } });
  const [showVotes] = useShowVotesMutation({ variables: { sessionId } });

  const allUsersVoted = userCount === currentVoteCount;

  return (
    <Box as="section" my={[2, 4]}>
      <Flex flexWrap="wrap" justifyContent={['center', 'unset']}>
        <Spaced mb={[3, 3, 0]} mr={[1, 2, 3]} includeLast={false}>
          <Button
            disabled={votesVisible || !currentVoteCount}
            onClick={() => showVotes()}
            variant={!votesVisible && allUsersVoted ? 'primary' : 'neutral'}
          >
            Show Votes
          </Button>
          <Button disabled={!votesVisible} onClick={() => clearVotes()}>
            Clear Votes
          </Button>
        </Spaced>
      </Flex>
    </Box>
  );
}
