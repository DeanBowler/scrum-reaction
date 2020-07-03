import { Variants, AnimatePresence, motion } from 'framer-motion';
import { ReactionIcon } from './PlanningPokerReactor';

const reactionMotions: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
    },
  },
  exit: {
    opacity: 0,
  },
  hidden: {
    y: -15,
    opacity: 0,
  },
};

export interface ReactionProps {
  reaction: string | null | undefined;
}

export default function AnimatedReaction({ reaction }: ReactionProps) {
  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      <motion.div
        key={reaction ?? undefined}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={reactionMotions}
      >
        <ReactionIcon reaction={reaction} />
      </motion.div>
    </AnimatePresence>
  );
}
