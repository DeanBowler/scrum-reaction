import React, { useState } from 'react';
import gql from 'graphql-tag';
import Card from '../../components/Card';
import Flex from '../../styled/Flex';
import TextInput from '../../styled/TextInput';
import Button from '../../styled/Button';
import Spaced from '../../styled/Spaced';
import { useCreatePokerSessionMutation } from '../../generated/graphql';
import { useAuth } from '../../contexts/authContext';
import { useRouter } from 'next/router';

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

  const { userId } = useAuth();

  const [sessionName, setSessionName] = useState('');

  const [createSession, { loading }] = useCreatePokerSessionMutation({
    variables: { owner_id: userId, name: sessionName },
    onCompleted: ({ insert_poker_session }) =>
      router.push(`/planning-poker/${insert_poker_session.returning[0].id}`),
  });

  const canCreate = !loading && sessionName.length > 0;

  const handleSessionNameInputChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSessionName(value);
  };

  return (
    <Card title="Start a new session" className={className}>
      <Flex flexDirection="column">
        <Spaced mb={[2, 3]} includeLast={false}>
          <TextInput
            onChange={handleSessionNameInputChange}
            disabled={loading}
            placeholder="session name"
          />
          <Button disabled={!canCreate} onClick={() => createSession()}>
            Start New Session
          </Button>
        </Spaced>
      </Flex>
    </Card>
  );
}
