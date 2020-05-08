import { Theme } from 'styled-system';
import { ThemedStyledProps, DefaultTheme } from 'styled-components';

type LineHeight = 'solid' | 'title' | 'copy';
type LetterSpacing = 'normal' | 'tracked' | 'tight' | 'mega';

export interface AppTheme extends Theme {
  colors: {
    primary: string;
    secondary: string;
    negative: string;
    neutralDarker: string;
    neutralDark: string;
    neutralMidDark: string;
    neutralMid: string;
    neutralMidLight: string;
    neutralLight: string;
    neutralLightest: string;
  };
  buttonRadius: string;
  lineHeights: { [key in LineHeight]: string | number };
  letterSpacings: { [key in LetterSpacing]: string | number };
}

const baseTheme = {
  colors: {
    primary: '#50b87e',
    secondary: '#ae4ab7',
    negative: '#cc3333',
    neutralDarker: '#293132',
    neutralDark: '#414549',
    neutralMidDark: '#85898b',
    neutralMid: '#cacdcd',
    neutralMidLight: '#d9dbdb',
    neutralLight: '#eaeded',
    neutralLightest: '#fff',
  },
};

const theme: AppTheme = {
  ...baseTheme,
  space: [0, '0.5rem', '0.75rem', '1rem', '2rem', '4rem', '8rem', '16rem'],
  sizes: [
    0,
    '1rem',
    '1.618rem',
    '2.618rem',
    '4.24rem',
    '6.85rem',
    '12rem',
    '18rem',
    '32rem',
    '52rem',
  ],
  lineHeights: {
    solid: '1',
    title: '1.25rem',
    copy: '1.5rem',
  },
  letterSpacings: {
    normal: 'normal',
    tracked: '0.1em',
    tight: '-0.05em',
    mega: '0.25em',
  },
  breakpoints: ['420px', '768px', '992px', '1200px'],
  buttonRadius: '5px',
};

export default theme;

export const getColor = (color: keyof AppTheme['colors']) => (
  p: ThemedStyledProps<unknown, DefaultTheme>,
) => p.theme.colors[color];

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
