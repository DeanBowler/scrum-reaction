import Head from 'next/head';
import Box from '../styled/Box';
import Text from '../styled/Text';

const Home = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <Box>
      <Text as="h2">Welcome!</Text>
    </Box>
  </>
);

export default Home;
