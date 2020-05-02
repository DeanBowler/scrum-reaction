import React from 'react';
import gql from 'graphql-tag';
import { pipe } from 'ramda';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useGetRecentSessionsQuery, Poker_Session } from '../../generated/graphql';
import { useAuth } from '../../contexts/authContext';
import Box from '../../styled/Box';
import Text from '../../styled/Text';
import { parseISO, formatRelative } from 'date-fns/fp';
import Flex from '../../styled/Flex';
import { isProduction } from '../../utils/env';

export const GET_RECENT_SESSIONS = gql`
  query getRecentSessions($userId: String!) {
    poker_session(
      where: { user_sessions: { user_id: { _eq: $userId } } }
      order_by: { created_at: desc }
      limit: 6
    ) {
      name
      owner_id
      id
      created_at
    }
  }
`;

interface PokerSessionListingProps {
  session: Pick<Poker_Session, 'name' | 'owner_id' | 'id' | 'created_at'>;
  currentUserId: string;
  onSessionClick(sessionId: number): void;
}

const PokerSessionListingContainer = styled(Flex)`
  cursor: pointer;
  align-items: flex-end;

  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const formatSessionCreation = pipe(parseISO, formatRelative(new Date()));

const PokerSessionListing = ({ session, onSessionClick }: PokerSessionListingProps) => (
  <Link href="/planning-poker/[id]" as={`/planning-poker/${session.id}`}>
    <PokerSessionListingContainer role="link" my={[2, 3]}>
      <Box width={[6]}>
        <Text fontSize={[1, 2]}>{formatSessionCreation(session.created_at)}</Text>
      </Box>
      <Text fontSize={[2, 3]}>{session.name}</Text>
    </PokerSessionListingContainer>
  </Link>
);

export default function RecentPokerSessions() {
  const { userId } = useAuth();
  const router = useRouter();

  const { data, loading } = useGetRecentSessionsQuery({ variables: { userId } });

  if (loading || !data.poker_session.length) return null;

  const handleListingClick = async (sessionId: number) => {
    if (isProduction) {
      await router.prefetch(`/planning-poker/[id]`, `/planning-poker/${sessionId}`);
    }
    router.push(`/planning-poker/[id]`, `/planning-poker/${sessionId}`);
  };

  return (
    <Box>
      <Text as="h3" fontWeight="400" fontSize={[2, 3, 4]}>
        Recent Sessions
      </Text>
      {data.poker_session.map(ps => (
        <PokerSessionListing
          key={ps.id}
          session={ps}
          currentUserId={userId}
          onSessionClick={handleListingClick}
        />
      ))}
    </Box>
  );
}
