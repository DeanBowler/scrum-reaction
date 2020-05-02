import React from 'react';
import { NextComponentType, NextPageContext } from 'next';
import { AppInitialProps } from 'next/app';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';
import { AuthContextProvider } from '../contexts/authContext';
import PollLastSeen from '../graphql/users/PollLastSeen';
import AuthorizedApolloProvider from '../contexts/authorizedApolloProvider';
import Tracking from '../components/Tracking';

export default function ({
  Component,
  pageProps,
}: AppInitialProps & { Component: NextComponentType<NextPageContext, unknown, {}> }) {
  const router = useRouter();

  return (
    <Tracking>
      <AuthContextProvider>
        <AuthorizedApolloProvider>
          {/* <PollLastSeen /> */}
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
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                id="page-transition-container"
              >
                <Component {...pageProps} key={router.route} />
              </motion.div>
            </AnimatePresence>
          </PageLayout>
        </AuthorizedApolloProvider>
      </AuthContextProvider>
    </Tracking>
  );
}