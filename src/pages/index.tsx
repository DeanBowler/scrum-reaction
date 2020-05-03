import Link from 'next/link';

import Box from '@styled/Box';
import Text from '@styled/Text';
import Card from '@components/Card';
import Flex from '@styled/Flex';
import Spaced from '@styled/Spaced';

const Home = () => (
  <Box>
    <Box my={[4, 5]} textAlign="center">
      <Text as="h1">ScrumReaction</Text>
      <Text as="h3" fontWeight="400">
        a budding suite of scrum and agile methodology tools
      </Text>
    </Box>
    <Flex justifyContent="center" flexWrap="wrap">
      <Spaced my={[3]} mx={[0, 2, 3]}>
        <Box>
          <Link href="/planning-poker" passHref={true}>
            <Card
              flex="0 0 auto"
              as="a"
              variant="link"
              role="link"
              title="Planning Poker"
              width={['100%', 7]}
              textAlign="center"
            >
              <Flex flexDirection="column" alignItems="center">
                <Box
                  as="img"
                  src="/images/pokerhand.png"
                  width={[3, 4]}
                  pl={2}
                  pb={[3, 4]}
                />
                <Text>Collaborative, gameified backlog estimation</Text>
                <Text as="div" color="neutralMidDark" mt={[3, 4]}>
                  Tap to get started
                </Text>
              </Flex>
            </Card>
          </Link>
        </Box>
      </Spaced>
    </Flex>
  </Box>
);

export default Home;
