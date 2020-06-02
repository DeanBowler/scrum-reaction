import { useState } from 'react';
import Box from '@styled/Box';
import PopoutMenu from '@components/PopoutMenu';
import Button from '@styled/Button';
import gql from 'graphql-tag';
import {
  useRemoveUserFromSessionMutation,
  useChangeOwnershipMutation,
  useToggleObserverRoleMutation,
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

export const TOGGLE_OBSERVER_ROLE = gql`
  mutation toggleObserverRole($sessionId: Int!, $userId: String!, $isObserver: Boolean!) {
    update_poker_user_session(
      where: { session_id: { _eq: $sessionId }, user_id: { _eq: $userId } }
      _set: { is_observer: $isObserver, current_vote: null, current_revote: null }
    ) {
      affected_rows
    }
  }
`;

export interface SessionUserMenuProps {
  sessionId: number;
  userId: string;
  isObserver: boolean;
}

type SessionUserActionType = 'KICK' | 'MAKE_OWNER' | 'TOGGLE_OBSERVER';

type SessionUserActionDefinition = {
  actionText: string;
  confirmationText?: string;
  confirmButtonText: string;
  action(): void;
  isInProgress?: boolean;
};

type SessionUserActionMap = Record<SessionUserActionType, SessionUserActionDefinition>;

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

export default function SessionUserMenu({
  userId,
  sessionId,
  isObserver,
}: SessionUserMenuProps) {
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

  const [
    toggleObserverRole,
    { loading: togglingObserverRole },
  ] = useToggleObserverRoleMutation({
    variables: { userId, sessionId, isObserver: !isObserver },
  });

  const handleClose = () => {
    setShowMenu(false);

    setClickedAction(undefined);
  };

  const handleRemoveConfirm = async () => {
    await removeUser();
    setShowMenu(false);
  };

  const handleChangeOwnershipConfirm = async () => {
    await giveOwnership();
    setShowMenu(false);
  };

  const handleToggleObserverConfirm = async () => {
    await toggleObserverRole();
    setShowMenu(false);
  };

  const actions: SessionUserActionMap = {
    TOGGLE_OBSERVER: {
      actionText: isObserver ? 'Make voter' : 'Make observer',
      confirmButtonText: 'Change role',
      action: handleToggleObserverConfirm,
      isInProgress: togglingObserverRole,
    },
    MAKE_OWNER: {
      actionText: 'Make session owner',
      confirmButtonText: 'Give control',
      action: handleChangeOwnershipConfirm,
      isInProgress: givingOwnership,
    },
    KICK: {
      actionText: 'Kick from session',
      confirmButtonText: 'Kick',
      action: handleRemoveConfirm,
      isInProgress: removingUser,
    },
  };

  return (
    <Box position="relative">
      <PopoutMenu.Button
        tabIndex={isCurrentUser ? -1 : 0}
        onClick={() => !isCurrentUser && setShowMenu(sm => !sm)}
        hidden={isCurrentUser}
      />
      <div>
        <PopoutMenu show={showMenu} onClose={handleClose}>
          <Box overflowX="hidden">
            <AnimatePresence initial={false} exitBeforeEnter={true}>
              <motion.div
                key={clickedAction}
                transition={{ ease: 'easeInOut', duration: 0.3 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {!clickedAction && (
                  <>
                    {toPairs(actions).map(
                      ([type, def]: [
                        SessionUserActionType,
                        SessionUserActionDefinition,
                      ]) => (
                        <PopoutMenu.Item
                          key={type}
                          onClick={() => setClickedAction(type)}
                        >
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
      </div>
    </Box>
  );
}
