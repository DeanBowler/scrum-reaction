import React from 'react';

import Head from 'next/head';
import Box from '../../styled/Box';
import Text from '../../styled/Text';
import Button from '../../styled/Button';
import Flex from '../../styled/Flex';
import Card from '../../components/Card';
import Spaced from '../../styled/Spaced';
import TextInput from '../../styled/TextInput';

const PlanningPoker = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <Box m={[0, 3, 4]}>
      <Text as="h2" fontWeight="400" fontSize={[3, 4, 5]}>
        Planning Poker
      </Text>
      <Flex flexDirection={['column', , 'row']}>
        <Spaced p="2" pb="0">
          <Card title="Start a new session">
            <Flex flexDirection="column">
              <Spaced mb={[2, 3]} includeLast={false}>
                <TextInput placeholder="session name" />
                <Button>Start New Session</Button>
              </Spaced>
            </Flex>
          </Card>
          <Card title="Join an existing session">
            <Flex flexDirection="column">
              <Spaced mb={[2, 3]} includeLast={false}>
                <TextInput placeholder="session id" />
                <Button>Join Session</Button>
              </Spaced>
            </Flex>
          </Card>
        </Spaced>
      </Flex>
    </Box>
  </>
);

export default PlanningPoker;
