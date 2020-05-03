import React from 'react';
import Head from 'next/head';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import Box from '@styled/Box';
import { useAuth } from '@contexts/authContext';
import theme from '../../styled/theme';

import Header from './Header';
import Footer from './Footer';
import Flex from '@styled/Flex';

interface LayoutProps {
  children: React.ReactNode;
}

const GlobalStyle = createGlobalStyle`
html {
  min-height: 100%;
  height: 100%;
  position:relative;
}

body {  
  position: relative;
  min-height: 100%;
  height: 100%;
  width: 100%;
  margin: 0;
  font-family: 'Raleway', 'Helvetica Neue', sans-serif;
}

#__next {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
`;

const Container = styled(Flex)`
  flex-direction: column;
  flex: 1 1 auto;
  background-image: url(/background.svg),
    linear-gradient(${theme.colors.neutralLightest}, ${theme.colors.neutralMidLight});
`;

export default function PageLayout({ children }: LayoutProps) {
  const { isLoadingAuth } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <Container color="neutralDarker" minHeight="100%">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,700'&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Header />

        <Box flex="1 0" py={[1, 2]} px={[2, 3, 4, 5]}>
          {isLoadingAuth ? <div></div> : children}
        </Box>

        <Footer />
      </Container>
      <GlobalStyle />
    </ThemeProvider>
  );
}
