import React from 'react';

import { useRouter } from 'next/router';
import Head from 'next/head';
import Box from '../../styled/Box';
import Text from '../../styled/Text';

export default function PlanningPoker() {
  const thing = useRouter();

  console.log(thing.query.id);
  return (
    <>
      <Head>
        <title>Homer</title>
      </Head>
      <Box>
        <Text as="h2" fontWeight="400" fontSize={[3, 4, 5]}>
          Planning Pokerrrr
        </Text>
      </Box>
    </>
  );
}
