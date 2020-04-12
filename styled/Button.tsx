import { space, SpaceProps, fontSize, FontSizeProps } from 'styled-system';
import styled from 'styled-components';

type ButtonProps = SpaceProps | FontSizeProps;

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  font-family: 'Raleway';
  background: ${p => p.theme.colors.neutralDark};
  color: ${p => p.theme.colors.neutralLight};
  border-radius: ${p => p.theme.buttonRadius};
  border: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 0px -1px;
  transition: all 200ms ease-in-out;

  :hover {
    opacity: 0.9;
    box-shadow: 0px 8px 0px -2px rgba(0, 0, 0, 0.1);
  }

  :focus {
    opacity: 0.9;
    outline: 2px solid ${p => p.theme.colors.primary};
  }

  :active {
    outline: none;
    box-shadow: 0px 5px 0px -1px rgba(0, 0, 0, 0.1);
  }

  :disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${space};
  ${fontSize};
`;

Button.defaultProps = {
  py: [2, 3],
  px: [3, 4],
  fontSize: [1, 2],
  // fontSize
};
export default Button;
