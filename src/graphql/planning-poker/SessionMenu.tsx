import { useState } from 'react';
import gql from 'graphql-tag';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCog } from 'react-icons/fa';

import { useSetAllowRevotesMutation, useSetAutoRevealMutation } from '@generated/graphql';
import useControlledState from '@hooks/useControlledState';
import Box from '@styled/Box';
import PopoutMenu from '@components/PopoutMenu';
import Text from '@styled/Text';
import Toggle from '@components/Toggle';
import { pipe, tap, not } from 'ramda';

export const SET_ALLOW_REVOTES = gql`
  mutation setAllowRevotes($sessionId: Int!, $allowRevotes: Boolean!) {
    update_poker_session(
      where: { id: { _eq: $sessionId } }
      _set: { allow_revotes: $allowRevotes }
    ) {
      affected_rows
    }
  }
`;

export const SET_AUTO_REVEAL = gql`
  mutation setAutoReveal($sessionId: Int!, $autoReveal: Boolean!) {
    update_poker_session(
      where: { id: { _eq: $sessionId } }
      _set: { auto_reveal: $autoReveal }
    ) {
      affected_rows
    }
  }
`;

interface SessionMenuProps {
  sessionId: number;
  allowRevotes: boolean;
  autoReveal: boolean;
}

export default function SessionMenu({
  sessionId,
  allowRevotes,
  autoReveal,
}: SessionMenuProps) {
  const [showMenu, setShowMenu] = useState(false);

  const [allowRevotesSetting, setAllowRevotesSetting] = useControlledState(allowRevotes);
  const [setAllowRevotes] = useSetAllowRevotesMutation();

  const handleRevoteToggle = () => {
    setAllowRevotesSetting(
      pipe(
        not,
        tap(v => setAllowRevotes({ variables: { sessionId, allowRevotes: v } })),
      ),
    );
  };

  const [autoRevealSetting, setAutoRevealSetting] = useControlledState(autoReveal);
  const [setAutoReveal] = useSetAutoRevealMutation();

  const handleAutoRevealToggle = () => {
    setAutoRevealSetting(
      pipe(
        not,
        tap(v => setAutoReveal({ variables: { sessionId, autoReveal: v } })),
      ),
    );
  };

  const handleClose = () => {
    setShowMenu(false);
  };

  return (
    <Box position="relative">
      <PopoutMenu.Button
        icon={FaCog}
        variant="large"
        onClick={() => setShowMenu(sm => !sm)}
      />
      <div>
        <PopoutMenu show={showMenu} onClose={handleClose}>
          <Box overflowX="hidden">
            <AnimatePresence initial={false} exitBeforeEnter={true}>
              <motion.div
                transition={{ ease: 'easeInOut', duration: 0.3 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <PopoutMenu.Item>
                  <Text textAlign="center" as="div">
                    Session Settings
                  </Text>
                </PopoutMenu.Item>
                <PopoutMenu.Divider />
                <PopoutMenu.Item onClick={handleRevoteToggle}>
                  <Toggle label="Allow Revotes" currentValue={allowRevotesSetting} />
                </PopoutMenu.Item>
                <PopoutMenu.Item onClick={handleAutoRevealToggle}>
                  <Toggle label="Auto Reveal" currentValue={autoRevealSetting} />
                </PopoutMenu.Item>
              </motion.div>
            </AnimatePresence>
          </Box>
        </PopoutMenu>
      </div>
    </Box>
  );
}
