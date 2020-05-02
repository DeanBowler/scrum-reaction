import { Theme } from 'styled-system';

export interface AppTheme extends Theme {
  colors: {
    primary: string;
    secondary: string;
    neutralDarker: string;
    neutralDark: string;
    neutralMidDark: string;
    neutralMid: string;
    neutralMidLight: string;
    neutralLight: string;
    neutralLightest: string;
  };
  buttonRadius: string;
}

// const generateScale = (start: number, length: number, scale: number) => Array(length).map((_, i) => i *  )

const theme: AppTheme = {
  colors: {
    primary: '#50b87e',
    secondary: '#ae4ab7',
    neutralDarker: '#293132',
    neutralDark: '#414549',
    neutralMidDark: '#85898b',
    neutralMid: '#cacdcd',
    neutralMidLight: '#d9dbdb',
    neutralLight: '#eaeded',
    neutralLightest: '#fff',
  },
  space: [0, '0.25rem', '0.5rem', '1rem', '2rem', '4rem', '8rem', '16rem'],
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
  breakpoints: ['420px', '768px', '992px', '1200px'],
  buttonRadius: '5px',
};

export default theme;

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
