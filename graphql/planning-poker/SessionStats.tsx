import React, { useLayoutEffect, useRef } from 'react';
import { pipe, map, filter, min, max, mean, median, reduce, all } from 'ramda';

import CanvasConfetti from 'canvas-confetti';

import { Poker_Session, Poker_User_Session } from '../../generated/graphql';
import Box from '../../styled/Box';
import Text from '../../styled/Text';
import Card from '../../components/Card';

export default function SessionStats(session: Poker_Session) {
  const votes = !session.votes_visible
    ? []
    : pipe(
        map((s: Poker_User_Session) => s.current_vote),
        filter(v => !!v),
      )(session.user_sessions);

  const unknownVotes = votes.length ? filter(v => v === '?')(votes).length : undefined;

  const numericVotes = pipe(
    map(Number.parseInt),
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
        const textCenterX = consensusTextEl.offsetLeft + consensusTextEl.offsetWidth / 2;

        CanvasConfetti({
          particleCount: 100,
          startVelocity: 45,
          spread: 70,
          origin: {
            y: consensusTextEl.offsetTop / window.innerHeight,
            x: textCenterX / window.innerWidth,
          },
        });
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [consensusReached]);

  return (
    <Card ml={[1, 2]} title="Stats" flex="0 0" minWidth={[6, , 7]}>
      {consensusReached && (
        <Text as="div" mb="3" ref={consensusTextRef} fontWeight="bold">
          CONSENSUS
        </Text>
      )}
      <Box>Highest: {highestVote}</Box>
      <Box>Lowest: {lowestVote}</Box>
      <Box>Mean: {meanVote}</Box>
      <Box>Median: {medianVote}</Box>
      <Box>No idea: {unknownVotes}</Box>
    </Card>
  );
}
