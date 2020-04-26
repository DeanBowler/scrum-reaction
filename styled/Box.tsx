import styled from 'styled-components';
import {
  space,
  layout,
  color,
  position,
  typography,
  background,
  flexbox,
  size,
  PositionProps,
  SpaceProps,
  LayoutProps,
  ColorProps,
  TypographyProps,
  BackgroundProps,
  FlexboxProps,
  SizeProps,
} from 'styled-system';
import { AppTheme } from '../theme';

export interface BaseProps extends React.RefAttributes<any> {
  as?: React.ElementType;
  // css?: styled.CSSObject | styled.FlattenSimpleInterpolation | string;
}

export interface BoxKnownProps
  extends BaseProps,
    SpaceProps,
    LayoutProps,
    ColorProps<AppTheme>,
    TypographyProps,
    PositionProps,
    BackgroundProps,
    FlexboxProps,
    SizeProps {}

export interface BoxProps
  extends BoxKnownProps,
    Omit<React.HTMLProps<HTMLDivElement>, keyof BoxKnownProps> {}

const Box: React.FunctionComponent<BoxProps> = styled.div<BoxProps>`
  ${space}
  ${layout}
  ${typography}
  ${color}
  ${position}
  ${background}
  ${size}
  ${flexbox}
`;

export default Box;
