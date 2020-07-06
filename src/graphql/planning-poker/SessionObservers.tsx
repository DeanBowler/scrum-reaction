import { AnimatePresence, motion, Variants } from 'framer-motion';

import { PokerUserSessionInfoFragment } from '@generated/graphql';
import Card from '@components/Card';

import UserSessionRow from './UserSessionRow';
import { useAuth } from '@contexts/authContext';

const MotionCard = motion.custom(Card);

const motionItemVariants: Variants = {
  enter: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -70 },
  exit: { opacity: 0, x: 70, transition: { ease: 'easeInOut' } },
};

export interface SessionObserversProps {
  observers: readonly PokerUserSessionInfoFragment[];
  showUserMenu: boolean;
  sessionId: number;
  isSessionOwner: boolean;
}

export default function SessionObservers({
  observers,
  showUserMenu,
  sessionId,
  isSessionOwner,
}: SessionObserversProps) {
  const { userId } = useAuth();

  const hasObservers = observers.length > 0;

  return (
    <AnimatePresence>
      {hasObservers && (
        <MotionCard
          title="Observers"
          transition={{
            ease: 'easeOut',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          spacingVariant="cosy"
        >
          <AnimatePresence>
            {observers.map(observer => (
              <motion.div
                variants={motionItemVariants}
                key={observer.user.id}
                initial="hidden"
                animate="enter"
                exit="exit"
              >
                <UserSessionRow
                  isSessionOwner={isSessionOwner && userId === observer.user.id}
                  sessionId={sessionId}
                  userSession={observer}
                  showUserMenu={showUserMenu}
                  votesVisible={false}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </MotionCard>
      )}
    </AnimatePresence>
  );
}
