import React from 'react';

import { NextComponentType, NextPageContext } from 'next';
import { AppInitialProps } from 'next/app';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

import { AuthContextProvider } from '@contexts/authContext';
import AuthorizedApolloProvider from '@contexts/authorizedApolloProvider';
import PageLayout from '@components/PageLayout';
import Tracking from '@components/Tracking';
import { ToastContextProvider } from '@components/Toast';
import { ThemeProvider } from 'styled-components';
import theme from '@styled/theme';

export default function ({
  Component,
  pageProps,
}: AppInitialProps & {
  Component: NextComponentType<NextPageContext, unknown, Record<string, unknown>>;
}) {
  const router = useRouter();

  return (
    <Tracking>
      <ThemeProvider theme={theme}>
        <ToastContextProvider>
          <AuthContextProvider>
            <AuthorizedApolloProvider>
              <PageLayout>
                <AnimatePresence initial={false} exitBeforeEnter>
                  <motion.div
                    transition={{
                      type: 'spring',
                      damping: 20,
                      stiffness: 100,
                      when: 'afterChildren',
                    }}
                    key={router.pathname}
                    initial={{ x: 70, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -70, opacity: 0 }}
                    id="page-transition-container"
                  >
                    <Component {...pageProps} key={router.route} />
                  </motion.div>
                </AnimatePresence>
              </PageLayout>
            </AuthorizedApolloProvider>
          </AuthContextProvider>
        </ToastContextProvider>
      </ThemeProvider>
    </Tracking>
  );
}
