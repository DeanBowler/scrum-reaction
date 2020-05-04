import React from 'react';

import Head from 'next/head';

import Box from '@styled/Box';
import Text from '@styled/Text';
import Flex from '@styled/Flex';
import Spaced from '@styled/Spaced';
import { FeatureRequiresAuth } from '@components/FeatureRequiresAuth';
import CreatePokerSession from '@graphql/planning-poker/CreatePokerSession';
import JoinPokerSession from '@graphql/planning-poker/JoinPokerSession';
import RecentPokerSessions from '@graphql/planning-poker/RecentPokerSessions';

const PlanningPoker = () => (
  <>
    <Head>
      <title>Planning Poker</title>
    </Head>
    <Box m={[0, 3, 4]}>
      <Text as="h2" fontWeight="400" fontSize={[3, 4, 5]}>
        Planning Poker
      </Text>
      <Text lineHeight="copy" as="aside">
        Gameified backlog estimation! Estimate your work without being influenced by
        others then discuss, argue, fall in love and eventually reach consensus.
      </Text>
      <FeatureRequiresAuth>
        <Flex
          flexDirection={['column', , 'row']}
          maxWidth={[9]}
          mx="auto"
          mt={[1, 3, 5]}
          mb={[2, 4, 6]}
        >
          <Spaced px={[2, 2, 2, 3]} py={[2, 3, 0]}>
            <CreatePokerSession />
            <JoinPokerSession />
          </Spaced>
        </Flex>
        <RecentPokerSessions />
      </FeatureRequiresAuth>
    </Box>
  </>
);

export default PlanningPoker;
