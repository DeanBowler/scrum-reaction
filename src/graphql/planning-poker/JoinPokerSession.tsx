import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';

import Card from '@components/Card';
import Flex from '@styled/Flex';
import TextInput from '@styled/TextInput';
import Button from '@styled/Button';
import Spaced from '@styled/Spaced';
import { useUpsetUserSessionMutation } from '@generated/graphql';
import { useAuth } from '@contexts/authContext';
import { isProduction } from '@utils/env';
import useDebouncedState from '@hooks/useDebouncedState';
import Text from '@styled/Text';

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

  const { userId = '' } = useAuth();

  const [sessionId, setSessionId] = useState<number>();

  const [joinSession, { loading, error }] = useUpsetUserSessionMutation({
    variables: { userId, sessionId: sessionId! },
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

  const errorMessage = React.useMemo(() => {
    if (!error) return null;
    if (
      error.graphQLErrors &&
      error.graphQLErrors[0].extensions?.code === 'constraint-violation'
    )
      return 'Session does not exist';
    return 'Unknown error occurred';
  }, [error]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (canJoin) joinSession();
    e.preventDefault();
  };

  return (
    <Card title="Join an existing session" className={className}>
      <form onSubmit={handleFormSubmit}>
        <Flex flexDirection="column">
          <Spaced mb={[2, 3]} includeLast={false}>
            {error && (
              <Text as="div" color="negative" fontWeight="500">
                {errorMessage}
              </Text>
            )}
            <TextInput
              type="number"
              onChange={handleSessionIdInputChange}
              placeholder="session id"
            />
            <Button type="submit" isLoading={debouncedLoading} disabled={!canJoin}>
              Join Session
            </Button>
          </Spaced>
        </Flex>
      </form>
    </Card>
  );
}
