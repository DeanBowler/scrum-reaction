import styled from 'styled-components';
import {
  space,
  layout,
  color,
  position,
  typography,
  background,
  PositionProps,
  SpaceProps,
  LayoutProps,
  ColorProps,
  TypographyProps,
  BackgroundProps,
} from 'styled-system';
import { AppTheme } from '../theme';

export interface BoxProps
  extends SpaceProps,
    LayoutProps,
    ColorProps<AppTheme>,
    TypographyProps,
    PositionProps,
    BackgroundProps {
  as?: React.ElementType;
}

const Box: React.FunctionComponent<BoxProps> = styled.div<BoxProps>`
  ${space}
  ${layout}
  ${typography}
  ${color}
  ${position}
  ${background}
`;

export default Box;
