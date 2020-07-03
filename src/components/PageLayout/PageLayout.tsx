import React from 'react';
import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';

import Box from '@styled/Box';
import { useAuth } from '@contexts/authContext';
import theme, { getColor, getFont } from '../../styled/theme';

import Header from './Header';
import Footer from './Footer';
import Flex from '@styled/Flex';
import Loading from '@components/Loading';

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
    font-family: ${getFont('normal')}, 'Helvetica Neue', sans-serif;
    font-size: 16px;
  }

  #__next {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  ul {
    padding-inline-start: 1rem;
  }

  li {
    margin: 1rem 0;
  }
`;

const Container = styled(Flex)`
  flex-direction: column;
  flex: 1 1 auto;
  background-image: url(/background.svg),
    linear-gradient(${getColor('neutralLightest')}, ${getColor('neutralMid')});
`;

export default function PageLayout({ children }: LayoutProps) {
  const { isLoadingAuth } = useAuth();

  return (
    <>
      <Container color="neutralDarker" minHeight="100%">
        <Head>
          <title>Scrum Reaction</title>
        </Head>
        <Header />

        <Box as="main" flex="1 0" py={[1, 2]} px={[2, 3, 4, 5]}>
          {isLoadingAuth ? <Loading delay={900} /> : children}
        </Box>

        <Footer />
      </Container>
      <GlobalStyle />
    </>
  );
}
