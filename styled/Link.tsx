import styled from 'styled-components';
import Text, { TextProps } from './Text';

export interface LinkProps
  extends TextProps,
    Omit<React.HTMLProps<HTMLAnchorElement>, keyof TextProps> {}

const Link: React.FunctionComponent<LinkProps> = styled(Text)<LinkProps>`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-weight: 500;

  :hover {
    color: ${({ theme }) => theme.colors.neutralDark};
  }
`;

export default Link;

Link.defaultProps = {
  as: 'a',
};
