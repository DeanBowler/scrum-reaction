import React from 'react';
import { useAuth } from '@contexts/authContext';
import Text from '@styled/Text';
import Box from '@styled/Box';
import Button from '@styled/Button';
import AuthImage from './AuthImage';
import styled from 'styled-components';
import Flex from '@styled/Flex';

interface FeatureRequiresAuthProps {
  children: React.ReactNode;
}

const StyledAuthImage = styled(AuthImage)`
  width: 100%;
  height: 100%;
`;

export function FeatureRequiresAuth({ children }: FeatureRequiresAuthProps) {
  const { isAuthenticated, loginWithRedirect } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <Box maxWidth="9" mx="auto" my={[4, 5]} textAlign="center">
          <Text as="h2" fontWeight="500" color="neutralDark">
            Login to access this feature
          </Text>
          <Flex width={[6, 7]} mb={[3, 4]} mx="auto">
            <StyledAuthImage />
          </Flex>
          <Button onClick={loginWithRedirect}>Login</Button>
        </Box>
      )}
    </>
  );
}
