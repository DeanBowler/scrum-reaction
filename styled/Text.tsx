import styled from 'styled-components';

import {
  fontSize,
  fontWeight,
  textAlign,
  space,
  color,
  typography,
  SpaceProps,
  LayoutProps,
  ColorProps,
  TypographyProps,
} from 'styled-system';
import { AppTheme } from '../theme';

type TextProps = SpaceProps | LayoutProps | ColorProps<AppTheme> | TypographyProps;

const Text = styled.span<TextProps>(
  fontSize,
  space,
  color,
  textAlign,
  fontWeight,
  typography,
);

export default Text;
