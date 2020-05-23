import React from 'react';
import gql from 'graphql-tag';

import {
  useClearVotesMutation,
  useShowVotesMutation,
  useSetAllowRevotesMutation,
} from '@generated/graphql';
import Box from '@styled/Box';
import Flex from '@styled/Flex';
import Button from '@styled/Button';
import Spaced from '@styled/Spaced';
import Toggle from '@components/Toggle';
import useControlledState from '@hooks/useControlledState';

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

export const SET_ALLOW_REVOTES = gql`
  mutation setAllowRevotes($sessionId: Int!, $allowRevotes: Boolean!) {
    update_poker_session(
      where: { id: { _eq: $sessionId } }
      _set: { allow_revotes: $allowRevotes }
    ) {
      affected_rows
    }
  }
`;

export interface SessionOwnerControlsProps {
  sessionId: number;
  votesVisible: boolean;
  allowRevotes: boolean;
  userCount: number;
  currentVoteCount: number;
}

export default function SessionOwnerControls({
  sessionId,
  votesVisible,
  userCount,
  currentVoteCount,
  allowRevotes,
}: SessionOwnerControlsProps) {
  const [clearVotes] = useClearVotesMutation({ variables: { sessionId } });
  const [showVotes] = useShowVotesMutation({ variables: { sessionId } });

  const [setAllowRevotes] = useSetAllowRevotesMutation();

  const [allowRevotesSetting, setAllowRevotesSetting] = useControlledState(allowRevotes);

  const handleRevoteToggle = () => {
    setAllowRevotesSetting(ar => {
      const toggled = !ar;
      setAllowRevotes({ variables: { sessionId, allowRevotes: toggled } });
      return toggled;
    });
  };

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
          <Button
            disabled={!votesVisible || !currentVoteCount}
            onClick={() => clearVotes()}
          >
            Clear Votes
          </Button>
          <Toggle
            label="Allow Revotes"
            currentValue={allowRevotesSetting}
            onClick={handleRevoteToggle}
          />
        </Spaced>
      </Flex>
    </Box>
  );
}
