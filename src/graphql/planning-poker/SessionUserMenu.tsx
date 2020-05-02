import { useState } from 'react';
import Box from '@styled/Box';
import PopoutMenu from '@components/PopoutMenu';
import Button from '@styled/Button';
import gql from 'graphql-tag';
import { useRemoveUserFromSessionMutation } from '@generated/graphql';
import { useAuth } from '@contexts/authContext';
import { motion, AnimatePresence } from 'framer-motion';

export const DELETE_USER_SESSION = gql`
  mutation removeUserFromSession($sessionId: Int!, $userId: String!) {
    delete_poker_user_session(
      where: { user_id: { _eq: $userId }, session_id: { _eq: $sessionId } }
    ) {
      affected_rows
    }
  }
`;

export interface SessionUserMenuProps {
  sessionId: number;
  userId: string;
}

type SessionUserAction = 'KICK';

export default function SessionUserMenu({ userId, sessionId }: SessionUserMenuProps) {
  const { userId: currentUserId } = useAuth();

  const isCurrentUser = userId === currentUserId;

  const [showMenu, setShowMenu] = useState(false);

  const [clickedAction, setClickedAction] = useState<SessionUserAction>();

  const [removeUser, { loading }] = useRemoveUserFromSessionMutation({
    variables: { userId, sessionId },
  });

  const handleClose = () => {
    setShowMenu(false);

    // delay change of the action until the menu has transitioned out to avoid messy animations
    setTimeout(() => setClickedAction(undefined), 200);
  };

  const handleRemoveConfirm = () => {
    removeUser();
    setShowMenu(false);
  };

  return (
    <Box position="relative">
      <PopoutMenu.Button
        tabIndex={isCurrentUser ? -1 : 0}
        onClick={() => !isCurrentUser && setShowMenu(sm => !sm)}
        hidden={isCurrentUser}
      />
      <PopoutMenu show={showMenu} onClose={handleClose}>
        <Box position="relative">
          <AnimatePresence initial={false}>
            <motion.div
              key={clickedAction}
              transition={{ ease: 'easeInOut', duration: 0.5 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, position: 'absolute' }}
            >
              {!clickedAction && (
                <PopoutMenu.Item key="kick" onClick={() => setClickedAction('KICK')}>
                  Kick from session
                </PopoutMenu.Item>
              )}

              {clickedAction === 'KICK' && (
                <>
                  <PopoutMenu.Item as="div">Are you sure?</PopoutMenu.Item>
                  <PopoutMenu.Item>
                    <Button
                      fullWidth={true}
                      onClick={handleRemoveConfirm}
                      isLoading={loading}
                    >
                      Kick
                    </Button>
                  </PopoutMenu.Item>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </Box>
      </PopoutMenu>
    </Box>
  );
}
