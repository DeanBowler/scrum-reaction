import React from 'react';
import styled from 'styled-components';

import Box, { BoxProps } from '@styled/Box';
import Text from '@styled/Text';
import Spaced from '@styled/Spaced';
import Flex from '@styled/Flex';
import DonateButton from '@components/DonateButton';

const StyledFooter: React.FunctionComponent<BoxProps> = styled(Box)`
  background-color: rgba(255, 255, 255, 0.25);
`;

export default function Footer() {
  return (
    <StyledFooter as="footer" mt={[1, 2, 3]} padding={[2, 3, 4]}>
      <Flex
        flexDirection={['column', 'row']}
        justifyContent={['initial', 'space-between']}
      >
        <Spaced mr={[1, 2]} my={[2, 0]}>
          <Text fontSize="1" color="neutralDark">
            © 2020 - Dean Bowler
          </Text>
        </Spaced>
        <DonateButton />
      </Flex>
    </StyledFooter>
  );
}
