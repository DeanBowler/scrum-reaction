import React from 'react';

import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import { useMount } from 'react-use';
import { isProduction } from '../utils/env';

export interface TrackingProps {
  children: React.ReactNode;
}

export default function Tracking({ children }: TrackingProps) {
  useMount(() => {
    if (!isProduction || !process.browser || !process.env.REACT_APP_LOGROCKET_KEY) return;

    LogRocket.init(process.env.REACT_APP_LOGROCKET_KEY);
    setupLogRocketReact(LogRocket);
  });

  return <>{children}</>;
}
