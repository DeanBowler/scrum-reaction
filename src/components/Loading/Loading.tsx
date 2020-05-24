import Flex from '@styled/Flex';
import SquareLoader from './SquareLoader';
import Text from '@styled/Text';
import { useTimeout } from 'react-use';
import { motion, AnimatePresence } from 'framer-motion';

export interface LoadingProps {
  text?: string;
  delay?: number;
}

const MotionFlex = motion.custom(Flex);

export default function Loading({ text, delay = 166 }: LoadingProps) {
  const [showLoading] = useTimeout(delay);

  if (!showLoading()) return null;

  return (
    <AnimatePresence>
      {showLoading() && (
        <MotionFlex
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          marginY={[5, 6]}
          flexDirection="column"
          alignItems="center"
        >
          <SquareLoader />
          {text && <Text marginTop={3}>{text}</Text>}
        </MotionFlex>
      )}
    </AnimatePresence>
  );
}
