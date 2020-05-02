import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import StyledLink from '@styled/Link';
import Flex from '@styled/Flex';
import Box from '@styled/Box';

import HeaderUser from './HeaderUser';

const StyledHeaderLink = styled(StyledLink)`
  color: ${({ theme }) => theme.colors.neutralLightest};

  :hover {
    color: ${({ theme }) => theme.colors.neutralMid};
  }
`;

export default function Header() {
  return (
    <Flex as="header" px={[1, 4]} py={[1, 2]} backgroundColor="neutralDarker">
      <Box flex={['1 1', , '0 1']} />
      <Box flex="1 0" textAlign={['center', , 'left']}>
        <Link href="/">
          <StyledHeaderLink fontSize={[3, 5]} fontFamily="Pacifico">
            ScrumReaction
          </StyledHeaderLink>
        </Link>
      </Box>
      <Flex flex="1 1" alignItems="center" justifyContent="flex-end">
        <HeaderUser />
      </Flex>
    </Flex>
  );
}
