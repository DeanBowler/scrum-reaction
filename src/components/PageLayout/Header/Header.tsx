import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import StyledLink from '@styled/Link';
import Flex from '@styled/Flex';
import Box from '@styled/Box';
import { getColor } from '@styled/theme';

import HeaderUser from './HeaderUser';

const StyledHeaderLink = styled(StyledLink)`
  text-decoration: none;
  color: ${getColor('neutralLightest')};

  :hover {
    color: ${getColor('neutralMid')};
  }

  :focus {
    outline: none;
    color: ${getColor('neutralMid')};
  }
`;

export default function Header() {
  return (
    <Flex as="header" px={[1, 4]} py={1} backgroundColor="neutralDarker">
      <Box flex={['1 1', , '0 1']} />
      <Box flex="1 0" textAlign={['center', , 'left']}>
        <Link href="/" passHref={true}>
          <StyledHeaderLink fontSize={[3, 4, 5]} fontFamily="cursive">
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
