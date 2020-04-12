import React from 'react';
import Box from '../../styled/Box';
import Text from '../../styled/Text';

// const StyledHeader = Box.withComponent('header');

export default function Header() {
  return (
    <Box
      as="header"
      px={[0, 4]}
      py={[1, 2]}
      textAlign={['center', , 'left']}
      backgroundColor="neutralDarker"
    >
      <Text as="span" color="neutralLight" fontSize={[3, 5]} fontFamily="Pacifico">
        ScrumReaction
      </Text>
    </Box>
  );
}
