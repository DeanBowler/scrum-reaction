import Head from 'next/head';
import Link from 'next/link';

import Box from '@styled/Box';
import Text from '@styled/Text';
import StyledLink from '@styled/Link';

const Home = () => (
  <>
    <Box>
      <Text as="h2">Welcome!</Text>
      <Link href="/planning-poker">
        <StyledLink>Planning Poker</StyledLink>
      </Link>
    </Box>
  </>
);

export default Home;
