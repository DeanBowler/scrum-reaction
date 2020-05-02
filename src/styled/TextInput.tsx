import styled from 'styled-components';
import {
  space,
  layout,
  color,
  typography,
  SpaceProps,
  LayoutProps,
  ColorProps,
  TypographyProps,
} from 'styled-system';

import {} from '@styled-system/theme-get';

import { AppTheme } from '../theme';

export interface TextInputProps
  extends SpaceProps,
    LayoutProps,
    ColorProps<AppTheme>,
    TypographyProps {}

const TextInput = styled.input<TextInputProps>`
  border-radius: 5px;
  border: 1px solid;
  border-color: ${p => p.theme.colors.neutralMid};
  ${space}
  ${layout}
  ${typography}
  ${color};
`;

TextInput.defaultProps = {
  p: [1, 2],
};

export default TextInput;
