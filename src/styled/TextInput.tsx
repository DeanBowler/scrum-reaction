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

import { AppTheme, getColor } from './theme';

export interface TextInputProps
  extends SpaceProps,
    LayoutProps,
    ColorProps<AppTheme>,
    TypographyProps {}

const TextInput = styled.input<TextInputProps>`
  border-radius: 5px;
  border: 1px solid;
  border-color: ${getColor('neutralMid')};
  font-family: 'Raleway';

  ${space}
  ${layout}
  ${typography}
  ${color};

  :focus {
    outline: none;
    border-color: ${getColor('primary')}
  }
`;

TextInput.defaultProps = {
  fontSize: [1],
  p: [1, 2],
};

export default TextInput;
