import Head from 'next/head';
import Box from '../styled/Box';
import Text from '../styled/Text';
import UserList from '../graphql/users/UsersList';

const Home = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <Box>
      <Text as="h2">Welcome!</Text>
      <UserList />
    </Box>
  </>
);

export default Home;
