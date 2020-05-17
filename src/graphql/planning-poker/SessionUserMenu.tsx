import { useState } from 'react';
import Box from '@styled/Box';
import PopoutMenu from '@components/PopoutMenu';
import Button from '@styled/Button';
import gql from 'graphql-tag';
import {
  useRemoveUserFromSessionMutation,
  useChangeOwnershipMutation,
} from '@generated/graphql';
import { useAuth } from '@contexts/authContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toPairs } from 'ramda';

export const DELETE_USER_SESSION = gql`
  mutation removeUserFromSession($sessionId: Int!, $userId: String!) {
    delete_poker_user_session(
      where: { user_id: { _eq: $userId }, session_id: { _eq: $sessionId } }
    ) {
      affected_rows
    }
  }
`;

export const CHANGE_SESSION_OWNER = gql`
  mutation changeOwnership($sessionId: Int!, $userId: String!) {
    update_poker_session(
      where: { id: { _eq: $sessionId } }
      _set: { owner_id: $userId }
    ) {
      affected_rows
    }
  }
`;

export interface SessionUserMenuProps {
  sessionId: number;
  userId: string;
}

type SessionUserActionType = 'KICK' | 'MAKE_OWNER';

type SessionUserActionDefinition = {
  actionText: string;
  confirmationText?: string;
  confirmButtonText: string;
  action(): void;
  isInProgress?: boolean;
};

type SessionUserActionMap = {
  [key in SessionUserActionType]: SessionUserActionDefinition;
};

const SessionUserMenuAction = ({
  confirmationText,
  confirmButtonText,
  action,
  isInProgress,
}: SessionUserActionDefinition) => (
  <>
    <PopoutMenu.Item as="div">{confirmationText || 'Are you sure?'}</PopoutMenu.Item>
    <PopoutMenu.Item>
      <Button fullWidth={true} onClick={action} isLoading={isInProgress}>
        {confirmButtonText}
      </Button>
    </PopoutMenu.Item>
  </>
);

export default function SessionUserMenu({ userId, sessionId }: SessionUserMenuProps) {
  const { userId: currentUserId } = useAuth();

  const isCurrentUser = userId === currentUserId;

  const [showMenu, setShowMenu] = useState(false);

  const [clickedAction, setClickedAction] = useState<SessionUserActionType>();

  const [removeUser, { loading: removingUser }] = useRemoveUserFromSessionMutation({
    variables: { userId, sessionId },
  });

  const [giveOwnership, { loading: givingOwnership }] = useChangeOwnershipMutation({
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

  const handleChangeOwnershipConfirm = () => {
    giveOwnership();
    setShowMenu(false);
  };

  const actions: SessionUserActionMap = {
    KICK: {
      actionText: 'Kick from session',
      confirmButtonText: 'Kick',
      action: handleRemoveConfirm,
      isInProgress: removingUser,
    },
    MAKE_OWNER: {
      actionText: 'Make session owner',
      confirmButtonText: 'Give control',
      action: handleChangeOwnershipConfirm,
      isInProgress: givingOwnership,
    },
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
                <>
                  {toPairs(actions).map(
                    ([type, def]: [
                      SessionUserActionType,
                      SessionUserActionDefinition,
                    ]) => (
                      <PopoutMenu.Item key={type} onClick={() => setClickedAction(type)}>
                        {def.actionText}
                      </PopoutMenu.Item>
                    ),
                  )}
                </>
              )}

              {clickedAction && <SessionUserMenuAction {...actions[clickedAction]} />}
            </motion.div>
          </AnimatePresence>
        </Box>
      </PopoutMenu>
    </Box>
  );
}
