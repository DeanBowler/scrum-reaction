import React from 'react';
import gql from 'graphql-tag';
import { pipe } from 'ramda';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { parseISO, formatRelative } from 'date-fns/fp';

import { useGetRecentSessionsQuery, Poker_Session } from '@generated/graphql';
import { useAuth } from '@contexts/authContext';
import Box, { BoxProps } from '@styled/Box';
import Text from '@styled/Text';
import Flex from '@styled/Flex';
import { getColor } from '@styled/theme';

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
}

const PokerSessionListingContainer = styled(Flex)<BoxProps>`
  cursor: pointer;
  align-items: flex-end;
  text-decoration: none;
  color: ${getColor('neutralDarker')};

  :hover {
    color: ${getColor('primary')};
  }

  :focus {
    outline: none;
    color: ${getColor('primary')};
  }
`;

const formatSessionCreation = pipe(parseISO, formatRelative(new Date()));

const PokerSessionListing = ({ session }: PokerSessionListingProps) => (
  <Link href="/planning-poker/[id]" as={`/planning-poker/${session.id}`} passHref={true}>
    <PokerSessionListingContainer as="a" role="link" my={[2, 3]}>
      <Box width={[6]}>
        <Text fontSize={[1, 2]}>{formatSessionCreation(session.created_at)}</Text>
      </Box>
      <Text fontSize={[2, 3]}>{session.name}</Text>
    </PokerSessionListingContainer>
  </Link>
);

export default function RecentPokerSessions() {
  const { userId } = useAuth();

  const { data, loading, error } = useGetRecentSessionsQuery({ variables: { userId } });

  if (loading || !data.poker_session.length) return null;

  if (error) return <Box>Failed to fetch previous poker sessions</Box>;

  return (
    <Box>
      <Text as="h3" fontWeight="400" fontSize={[2, 3, 4]}>
        Recent Sessions
      </Text>
      {data.poker_session.map(ps => (
        <PokerSessionListing key={ps.id} session={ps} currentUserId={userId} />
      ))}
    </Box>
  );
}
