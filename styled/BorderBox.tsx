import styled from 'styled-components';
import { border, shadow, BorderProps, ShadowProps } from 'styled-system';
import Box, { BoxProps } from './Box';
import { AppTheme } from '../theme';

export interface BorderBoxProps extends BoxProps, BorderProps<AppTheme>, ShadowProps {}

const BorderBox: React.FunctionComponent<BorderBoxProps> = styled(Box)<BorderBoxProps>`
  ${border}
  ${shadow}
`;

export default BorderBox;
