import styled from 'styled-components';
// import { flexbox, FlexboxProps as StyledFlexProps } from 'styled-system';
import Box, { BoxProps } from './Box';

// interface FlexProps extends BoxProps, StyledFlexProps {}

const Flex: React.FunctionComponent<BoxProps> = styled(Box)<BoxProps>`
  display: flex;
`;

export default Flex;