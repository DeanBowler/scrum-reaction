import React from 'react';
import { useAuth } from '@contexts/authContext';
import Text from '@styled/Text';
import Box from '@styled/Box';
import Button from '@styled/Button';

interface FeatureRequiresAuthProps {
  children: React.ReactNode;
}

export function FeatureRequiresAuth({ children }: FeatureRequiresAuthProps) {
  const { isAuthenticated, loginWithRedirect } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <Box maxWidth="9" mx="auto" my={[4, 5]} textAlign="center">
          <Text as="h2">Really sorry but this feature currently requires a login</Text>
          <Text as="p">
            Rest assured that the machine elves are busy working to get this running in an
            anonymous context
          </Text>
          <Button my={[3, 4]} onClick={loginWithRedirect}>
            Login
          </Button>
        </Box>
      )}
    </>
  );
}
