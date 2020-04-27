import Head from 'next/head';
import Box from '../styled/Box';
import Text from '../styled/Text';
import UserList from '../graphql/users/UsersList';
import Link from '../styled/Link';

const Home = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <Box>
      <Text as="h2">Welcome!</Text>
      <Link href="/planning-poker">
        <Text>Planning Poker</Text>
      </Link>
      {/* <UserList /> */}
    </Box>
  </>
);

export default Home;
