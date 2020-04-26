import React from 'react';
import BorderBox, { BorderBoxProps } from '../styled/BorderBox';
import Box from '../styled/Box';
import Text from '../styled/Text';
import styled from 'styled-components';
import Flex from '../styled/Flex';

export interface CardProps extends BorderBoxProps {
  children: React.ReactNode;
  title?: string;
}

export default function Card({ title, children, ...rest }: CardProps) {
  return (
    <Flex flexDirection="column" flex="1 1 auto" {...rest}>
      {title && (
        <Text
          as="div"
          fontWeight="300"
          textAlign="center"
          color="neutralDark"
          pb={[1]}
          fontSize={[2, 3]}
        >
          {title}
        </Text>
      )}
      <BorderBox
        backgroundColor="neutralLightest"
        borderColor="neutralMid"
        borderWidth="1px"
        borderRadius="5px"
        borderStyle="solid"
        padding={[2, 3, 4]}
        mb="5px"
        boxShadow="rgba(0, 0, 0, 0.1) 0px 5px 0px -1px"
      >
        <Box width="100%">{children}</Box>
      </BorderBox>
    </Flex>
  );
}
