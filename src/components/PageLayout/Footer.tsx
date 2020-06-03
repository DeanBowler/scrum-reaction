import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import Box, { BoxProps } from '@styled/Box';
import Text from '@styled/Text';
import Spaced from '@styled/Spaced';
import Flex from '@styled/Flex';
import StyledLink from '@styled/Link';
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
        alignItems="flex-start"
      >
        <Flex flexDirection="column" justifyContent="flex-end">
          <Link href="/release-notes">
            <StyledLink fontSize="1" mb={[1, 2]}>
              Release notes
            </StyledLink>
          </Link>
          <Text fontSize="1" color="neutralDark" mb={[1, 0]}>
            © 2020 - Dean Bowler
          </Text>
        </Flex>
        <DonateButton />
      </Flex>
    </StyledFooter>
  );
}
