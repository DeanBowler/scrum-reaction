import {
  space,
  SpaceProps,
  fontSize,
  FontSizeProps,
  variant,
  ResponsiveValue,
  flex,
  FlexProps,
} from 'styled-system';
import styled, { keyframes, css } from 'styled-components';
import { getColor, AppTheme } from '@styled/theme';

export interface ButtonProps
  extends SpaceProps<AppTheme>,
    FontSizeProps<AppTheme>,
    FlexProps<AppTheme> {
  isLoading?: boolean;
  fullWidth?: boolean;
  variant?: ResponsiveValue<'primary' | 'neutral' | 'negative' | 'outline'>;
}

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  position: relative;
  font-family: 'Raleway';
  background: ${getColor('neutralDark')};
  color: ${getColor('neutralLightest')};
  border-radius: ${p => p.theme.buttonRadius};
  border: 1px solid transparent;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 0px -1px;
  transition: box-shadow 200ms ease-in-out, background 300ms ease-in-out,
    opacity 300ms ease-in-out;
  overflow: hidden;

  width: ${p => (p.fullWidth ? '100%' : '')};

  ${variant({
    variants: {
      primary: {
        backgroundColor: 'primary',
      },
      neutral: {
        backgroundColor: 'neutral',
      },
      outline: {
        backgroundColor: 'transparent',
        color: 'neutralDark',
        border: '1px solid',
        borderColor: 'neutralMidDark',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 5px 0px -1px',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.35)',
        },
      },
      negative: {
        backgroundColor: 'negative',
        color: 'neutralLightest',
      },
    },
  })}

  ${({ isLoading }) =>
    isLoading
      ? css`
          text-indent: -200vw;

          &::after {
            content: ' ';
            display: block;
            border: 4px solid rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            border-top-color: white;
            opacity: 1;
            position: absolute;
            left: 25%;
            right: 25%;
            top: 25%;
            bottom: 25%;
            margin: auto;
            width: 16px;
            height: 16px;
            transition: opacity 200ms;
            animation: ${rotate} 1s linear;
            animation-iteration-count: infinite;
            transition-delay: 200ms;
          }
        `
      : css`
          :hover {
          opacity: 0.9;
          box-shadow: 0px 8px 0px -2px rgba(0, 0, 0, 0.1);
        }

        :focus {
          opacity: 0.9;
          outline: none;
          border-color: ${getColor('primary')};
        }

        :active {
          outline: none;
          box-shadow: 0px 5px 0px -1px rgba(0, 0, 0, 0.1);
        }

        :disabled {
          cursor: not-allowed;
          opacity: 0.75;
        }
     }
   `};

  ${space};
  ${fontSize};
  ${flex};
`;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
}`;

Button.defaultProps = {
  py: [2, 3],
  px: [3, 4],
  fontSize: [1, 2],
  variant: 'neutral',
};
export default Button;
