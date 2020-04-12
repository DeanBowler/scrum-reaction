import React from 'react';
import Head from 'next/head';

import Box from '../../styled/Box';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../../theme';
import Header from './Header';
import Footer from './Footer';

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
  background-image:  url(/background.svg), linear-gradient(${theme.colors.neutralLightest}, ${theme.colors.neutralMidLight});
  min-height: 100%;
  height: 100%;
  width: 100%;
  margin: 0;
  font-family: 'Raleway', 'Helvetica Neue', sans-serif;
}
`;

export default function PageLayout({ children }: LayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <Box color="neutralDarker">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css?family=Raleway:300,400,700'&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Header />
        <Box p={[2, 3, 4]}>{children}</Box>
        <Footer />
      </Box>
      <GlobalStyle />
    </ThemeProvider>
  );
}
