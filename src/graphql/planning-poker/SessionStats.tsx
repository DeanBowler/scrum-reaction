import React, { useLayoutEffect, useRef } from 'react';
import { pipe, map, filter, min, max, mean, median, reduce, all, any } from 'ramda';

import CanvasConfetti from 'canvas-confetti';

import { Poker_Session, Poker_User_Session } from '@generated/graphql';
import Box from '@styled/Box';
import Text from '@styled/Text';
import Card from '@components/Card';
import mode from '@utils/mode';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'styled-components';

const formatStat = (value: number | undefined) =>
  value &&
  value.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });

function SessionStats(session: Poker_Session) {
  const theme = useTheme();

  const hasRevotes = any(s => s.current_revote !== null, session.user_sessions);

  const votes = !session.votes_visible
    ? []
    : pipe(
        map((s: Poker_User_Session) => s.current_revote ?? s.current_vote),
        filter(v => !!v),
      )(session.user_sessions);

  const unknownVotes = votes.length ? filter(v => v === '?')(votes).length : undefined;

  const numericVotes = pipe(
    map((n: string | null | undefined) => (n ? +n : Number.NaN)),
    filter(n => !Number.isNaN(n)),
  )(votes);

  const highestVote = numericVotes.length
    ? reduce(max, -Infinity, numericVotes)
    : undefined;

  const lowestVote = numericVotes.length
    ? reduce(min, Infinity, numericVotes)
    : undefined;

  const meanVote = numericVotes.length ? mean(numericVotes) : undefined;
  const medianVote = numericVotes.length ? median(numericVotes) : undefined;
  const modeVote = numericVotes.length ? mode(numericVotes) : undefined;

  const areAllVotesNumeric = numericVotes.length == votes.length;

  const allNumericEqual =
    areAllVotesNumeric &&
    numericVotes.length > 1 &&
    all(x => x === numericVotes[0], numericVotes);

  const consensusReached = !hasRevotes && allNumericEqual;
  const compromiseReached = hasRevotes && allNumericEqual;

  const dissensionReached =
    numericVotes.length > 1 && new Set(numericVotes).size === numericVotes.length;

  const specialText = consensusReached
    ? 'CONSENSUS'
    : compromiseReached
    ? 'COMPROMISE'
    : dissensionReached
    ? 'DISSENSION'
    : null;

  const consensusTextRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (allNumericEqual) {
      const timeout = setTimeout(() => {
        if (!consensusTextRef.current) return;

        const consensusTextEl = consensusTextRef.current;

        const viewportOffset = consensusTextEl.getBoundingClientRect();

        const textCenterX = viewportOffset.left + consensusTextEl.offsetWidth / 2;

        const yOffset = viewportOffset.top / window.innerHeight;
        const xOffset = textCenterX / window.innerWidth;

        const origin = {
          y: yOffset,
          x: xOffset,
        };

        const confettiConfig: CanvasConfetti.Options = consensusReached
          ? {
              particleCount: 100,
              startVelocity: 30,
              spread: 80,
              origin,
            }
          : {
              particleCount: 40,
              startVelocity: 20,
              spread: 60,
              origin,
              colors: [
                theme.colors.neutralDark,
                theme.colors.neutralMid,
                theme.colors.neutralLight,
              ],
            };

        CanvasConfetti(confettiConfig);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [allNumericEqual]);

  return (
    <Card title="Stats" flex="0 0" minWidth={[6, 6, 7]}>
      <AnimatePresence exitBeforeEnter={true}>
        {specialText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            key={specialText}
          >
            <Text
              as="div"
              letterSpacing="mega"
              mb="3"
              ref={consensusTextRef}
              fontWeight="bold"
            >
              {specialText}
            </Text>
          </motion.div>
        )}
      </AnimatePresence>

      <Box>
        Highest: <Text fontSize={3}>{highestVote}</Text>
      </Box>
      <Box>
        Lowest: <Text fontSize={3}>{lowestVote}</Text>
      </Box>
      <br />
      <Box>
        Mean: <Text fontSize={3}>{formatStat(meanVote)}</Text>
      </Box>
      <Box>
        Mode: <Text fontSize={3}>{formatStat(modeVote)}</Text>
      </Box>
      <Box>
        Median: <Text fontSize={3}>{formatStat(medianVote)}</Text>
      </Box>
      <br />
      <Box>
        No idea: <Text fontSize={3}>{unknownVotes}</Text>
      </Box>
    </Card>
  );
}

export default React.memo(SessionStats);
