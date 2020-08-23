import styled from 'styled-components';
import Box, { BoxProps } from './Box';

const Flex: React.FunctionComponent<BoxProps> = styled(Box)<BoxProps>`
  display: flex;
`;

export default Flex;
