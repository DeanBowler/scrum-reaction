import { useState } from 'react';
import Box from '@styled/Box';
import PopoutMenu from '@components/PopoutMenu';
import Button from '@styled/Button';
import gql from 'graphql-tag';
import { useRemoveUserFromSessionMutation } from '@generated/graphql';
import { useAuth } from '@contexts/authContext';

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
    setClickedAction(undefined);
  };

  return (
    <Box position="relative">
      <PopoutMenu.Button
        onClick={() => !isCurrentUser && setShowMenu(true)}
        hidden={isCurrentUser}
      />
      <PopoutMenu show={showMenu} onClose={handleClose}>
        {!clickedAction && (
          <PopoutMenu.Item onClick={() => setClickedAction('KICK')}>
            Kick from session
          </PopoutMenu.Item>
        )}

        {clickedAction === 'KICK' && (
          <>
            <PopoutMenu.Item as="div">Are you sure?</PopoutMenu.Item>
            <PopoutMenu.Item>
              <Button fullWidth={true} onClick={() => removeUser()} isLoading={loading}>
                Kick
              </Button>
            </PopoutMenu.Item>
          </>
        )}
      </PopoutMenu>
    </Box>
  );
}
