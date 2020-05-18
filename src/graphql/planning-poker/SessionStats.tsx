import React, { useLayoutEffect, useRef } from 'react';
import { pipe, map, filter, min, max, mean, median, reduce, all } from 'ramda';

import CanvasConfetti from 'canvas-confetti';

import { Poker_Session, Poker_User_Session } from '@generated/graphql';
import Box from '@styled/Box';
import Text from '@styled/Text';
import Card from '@components/Card';
import mode from '@utils/mode';

const formatStat = (value: number | undefined) =>
  value &&
  value.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });

export default function SessionStats(session: Poker_Session) {
  const votes = !session.votes_visible
    ? []
    : pipe(
        map((s: Poker_User_Session) => s.current_vote),
        filter(v => !!v),
      )(session.user_sessions);

  const unknownVotes = votes.length ? filter(v => v === '?')(votes).length : undefined;

  const numericVotes = pipe(
    map(n => +n),
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
  const consensusReached =
    areAllVotesNumeric &&
    numericVotes.length > 1 &&
    all(x => x === numericVotes[0], numericVotes);

  const consensusTextRef = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    if (consensusReached) {
      const timeout = setTimeout(() => {
        if (!consensusTextRef.current) return;

        const consensusTextEl = consensusTextRef.current;

        var viewportOffset = consensusTextEl.getBoundingClientRect();

        const textCenterX = viewportOffset.left + consensusTextEl.offsetWidth / 2;

        const yOffset = viewportOffset.top / window.innerHeight;
        const xOffset = textCenterX / window.innerWidth;

        CanvasConfetti({
          particleCount: 100,
          startVelocity: 30,
          spread: 80,
          origin: {
            y: yOffset,
            x: xOffset,
          },
        });
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [consensusReached]);

  return (
    <Card ml={[1, 2]} title="Stats" flex="0 0" minWidth={[6, , 7]}>
      {consensusReached && (
        <Text
          letterSpacing="mega"
          as="div"
          mb="3"
          ref={consensusTextRef}
          fontWeight="bold"
        >
          CONSENSUS
        </Text>
      )}
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
