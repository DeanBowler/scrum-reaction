import styled from 'styled-components';
import {
  space,
  layout,
  color,
  position,
  typography,
  background,
  flexbox,
  PositionProps,
  SpaceProps,
  LayoutProps,
  ColorProps,
  TypographyProps,
  BackgroundProps,
  FlexboxProps,
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
    FlexboxProps {}

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
  ${flexbox}
`;

export default Box;
