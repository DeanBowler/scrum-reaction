import styled from 'styled-components';

import Text, { TextProps } from './Text';
import { getColor } from './theme';

export interface LinkProps
  extends TextProps,
    Omit<React.HTMLProps<HTMLAnchorElement>, keyof TextProps> {}

const Link: React.FunctionComponent<LinkProps> = styled(Text)<LinkProps>`
  color: ${getColor('primary')};
  cursor: pointer;
  font-weight: 500;

  :hover {
    color: ${getColor('neutralDark')};
  }
`;

export default Link;

Link.defaultProps = {
  as: 'a',
};
