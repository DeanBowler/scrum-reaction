import React from 'react';

import { useRouter } from 'next/router';
import Head from 'next/head';

import Box from '@styled/Box';
import PlanningPokerSession from '@graphql/planning-poker/PlanningPokerSession';
import { FeatureRequiresAuth } from '@components/FeatureRequiresAuth';

export default function PlanningPoker() {
  const { query } = useRouter();

  if (typeof query.id !== 'string') return null;

  const sessionId = Number.parseInt(query.id);

  return (
    <>
      <Head>
        <title>Planning Poker</title>
      </Head>
      <Box>
        <FeatureRequiresAuth>
          <PlanningPokerSession sessionId={sessionId} />
        </FeatureRequiresAuth>
      </Box>
    </>
  );
}
