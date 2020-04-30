import React, { useState } from 'react';
import gql from 'graphql-tag';
import Card from '../../components/Card';
import Flex from '../../styled/Flex';
import TextInput from '../../styled/TextInput';
import Button from '../../styled/Button';
import Spaced from '../../styled/Spaced';
import { useUpsetUserSessionMutation } from '../../generated/graphql';
import { useAuth } from '../../contexts/authContext';
import { useRouter } from 'next/router';
import { isProduction } from '../../utils/env';
import useDebouncedState from '../../hooks/useDebouncedState';

export const JOIN_POKER_SESSION = gql`
  mutation upsetUserSession($sessionId: Int!, $userId: String!) {
    insert_poker_user_session(
      objects: { user_id: $userId, session_id: $sessionId }
      on_conflict: { constraint: poker_user_session_pkey, update_columns: [] }
    ) {
      affected_rows
    }
  }
`;

interface JoinPokerSessionProps {
  className?: string;
}

export default function JoinPokerSession({ className }: JoinPokerSessionProps) {
  const router = useRouter();

  const { userId } = useAuth();

  const [sessionId, setSessionId] = useState<number>();

  const [joinSession, { loading }] = useUpsetUserSessionMutation({
    variables: { userId, sessionId },
    onCompleted: async () => {
      if (isProduction) {
        await router.prefetch(`/planning-poker/[id]`, `/planning-poker/${sessionId}`);
      }
      router.push(`/planning-poker/[id]`, `/planning-poker/${sessionId}`);
    },
  });

  const canJoin = !loading && sessionId && sessionId > 0;

  const debouncedLoading = useDebouncedState(loading);

  const handleSessionIdInputChange = ({
    target: { valueAsNumber },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSessionId(valueAsNumber);
  };

  return (
    <Card title="Join an existing session" className={className}>
      <Flex flexDirection="column">
        <Spaced mb={[2, 3]} includeLast={false}>
          <TextInput
            type="number"
            onChange={handleSessionIdInputChange}
            placeholder="session id"
          />
          <Button
            isLoading={debouncedLoading}
            disabled={!canJoin}
            onClick={() => canJoin && joinSession()}
          >
            Join Session
          </Button>
        </Spaced>
      </Flex>
    </Card>
  );
}
