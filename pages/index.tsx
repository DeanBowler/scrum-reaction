import Head from 'next/head';
import Box from '../styled/Box';
import Text from '../styled/Text';
import StyledLink from '../styled/Link';
import Link from 'next/link';

const Home = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <Box>
      <Text as="h2">Welcome!</Text>
      <Link href="/planning-poker">
        <StyledLink>Planning Poker</StyledLink>
      </Link>
    </Box>
  </>
);

export default Home;
