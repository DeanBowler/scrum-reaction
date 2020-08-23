import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';

import { useAuth } from '@contexts/authContext';
import { useCreatePokerSessionMutation } from '@generated/graphql';
import { isProduction } from '@utils/env';
import useDebouncedState from '@hooks/useDebouncedState';
import Card from '@components/Card';
import Flex from '@styled/Flex';
import TextInput from '@styled/TextInput';
import Button from '@styled/Button';
import Spaced from '@styled/Spaced';

export const CREATE_POKER_SESSION = gql`
  mutation createPokerSession($name: String!, $owner_id: String!) {
    insert_poker_session(objects: { name: $name, owner_id: $owner_id }) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

interface CreatePokerSessionProps {
  className?: string;
}

export default function CreatePokerSession({ className }: CreatePokerSessionProps) {
  const router = useRouter();

  const { userId = '' } = useAuth();

  const [sessionName, setSessionName] = useState('');

  const [createSession, { loading }] = useCreatePokerSessionMutation({
    variables: { owner_id: userId, name: sessionName },
    onCompleted: async ({ insert_poker_session }) => {
      const sessionId = insert_poker_session?.returning[0].id;
      if (isProduction) {
        await router.prefetch(`/planning-poker/[id]`, `/planning-poker/${sessionId}`);
      }
      router.push(`/planning-poker/[id]`, `/planning-poker/${sessionId}`);
    },
  });

  const debouncedLoading = useDebouncedState(loading);

  const canCreate = !loading && sessionName.length > 0;

  const handleSessionNameInputChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSessionName(value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (canCreate) createSession();
    e.preventDefault();
  };

  return (
    <Card title="Start a new session" className={className}>
      <form onSubmit={handleFormSubmit}>
        <Flex flexDirection="column" fontSize="small">
          <Spaced mb={[2, 3]} includeLast={false}>
            <TextInput
              onChange={handleSessionNameInputChange}
              disabled={loading}
              placeholder="session name"
            />
            <Button type="submit" isLoading={debouncedLoading} disabled={!canCreate}>
              Start New Session
            </Button>
          </Spaced>
        </Flex>
      </form>
    </Card>
  );
}
