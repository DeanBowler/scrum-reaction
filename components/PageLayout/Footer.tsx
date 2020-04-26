import Box from '../../styled/Box';
import Link from '../../styled/Link';
import Text from '../../styled/Text';
import Space from '../../styled/Spaced';
import Flex from '../../styled/Flex';

import { IoLogoGithub } from 'react-icons/io';

// const StyledFooter = styled('footer')(css({
//   position: 'fixed',
// }));

export default function Footer() {
  return (
    <Box
      as="footer"
      position="absolute"
      bottom="0"
      left="0"
      right="0"
      padding={[2, 3, 4]}
    >
      <Box as="hr" mb={[2, 3, 4]} />
      <Flex flexDirection={['column', 'row']}>
        <Space mr={[1, 2]} my={[1, 0]}>
          <Text>Copyright © 2020 - Dean Bowler</Text>
          <Link href="https://github.com/DeanBowler/scrum-reaction">
            <IoLogoGithub />
          </Link>
        </Space>
      </Flex>
    </Box>
  );
}
