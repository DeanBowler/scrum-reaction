import React from 'react';
import { Poker_Session } from '../../generated/graphql';
import Box from '../../styled/Box';
import Text from '../../styled/Text';
import { pipe, map, filter, min, max, mean, median, reduce } from 'ramda';
import Card from '../../components/Card';

export default function SessionStats(session: Poker_Session) {
  const votes = session.user_sessions.map(s => s.current_vote);

  const unknownVotes = filter(v => v === '?')(votes).length;

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

  return (
    <Card ml={[1, 2]} title="Stats" flex="0 0" minWidth={[6, , 7]}>
      <Box>Highest: {highestVote}</Box>
      <Box>Lowest: {lowestVote}</Box>
      <Box>Mean: {meanVote}</Box>
      <Box>Median: {medianVote}</Box>
      <Box>No idea: {unknownVotes}</Box>
    </Card>
  );
}
