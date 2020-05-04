import React from 'react';

import BorderBox, { BorderBoxProps } from '@styled/BorderBox';
import Box from '@styled/Box';
import Text from '@styled/Text';
import Flex from '@styled/Flex';
import styled, { css } from 'styled-components';
import { getColor } from '@styled/theme';
import { ResponsiveValue, FlexProps, variant } from 'styled-system';

type Variants = 'link';

type SpacingVariants = 'narrow' | 'cosy';

export interface CardProps extends BorderBoxProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  variant?: ResponsiveValue<Variants>;
  spacingVariant?: ResponsiveValue<SpacingVariants>;
}

interface CardContentContainerProps extends BorderBoxProps {
  spacingVariant?: ResponsiveValue<SpacingVariants>;
}

const CardContentContainer = styled(BorderBox)<CardContentContainerProps>`
  background-color: ${getColor('neutralLightest')};
  border: 1px solid ${getColor('neutralMid')};
  border-radius: 5px;
  box-shadow: 0px 5px 0px -1px rgba(0, 0, 0, 0.1);
  transition: box-shadow 100ms;

  ${variant({
    prop: 'spacingVariant',
    variants: {
      narrow: {
        padding: [1, 2],
      },
      cosy: {
        padding: [2, 3],
      },
    },
  })}
`;

const CardTitle = styled(Text)`
  font-weight: 300;
  text-align: center;

  color: ${getColor('neutralDark')};
`;

interface CardContainerProps extends FlexProps {
  variant?: ResponsiveValue<Variants>;
}

const CardContainer = styled(Flex)<CardContainerProps>`
  color: ${getColor('neutralDark')};
  text-decoration: none;
  transform: translateY(0);
  transition: transform 200ms;
  background: transparent;
  border: none;

  ${p =>
    p.variant === 'link' &&
    css`
      cursor: pointer;
      :hover {
        transform: translateY(-3px);
      }
      :hover > ${CardTitle} {
        color: ${getColor('primary')};
      }
      :hover > ${CardContentContainer} {
        box-shadow: 0px 8px 0px -2px rgba(0, 0, 0, 0.1);
      }
      :focus {
        outline: none;
        & > ${CardTitle} {
          color: ${getColor('primary')};
        }
        & > ${CardContentContainer} {
          border-color: ${getColor('primary')};
        }
      }
    `};
`;

const Card = React.forwardRef(
  ({ title, children, variant, spacingVariant, ...rest }: CardProps, ref) => {
    return (
      <CardContainer
        ref={ref}
        tabIndex={variant === 'link' ? 0 : undefined}
        variant={variant}
        flexDirection="column"
        flex="1 1 auto"
        {...rest}
      >
        {title && (
          <CardTitle as="div" pb={[1]} fontSize={[2, 3]}>
            {title}
          </CardTitle>
        )}
        <CardContentContainer spacingVariant={spacingVariant} padding={[3, 4]}>
          <Box width="100%">{children}</Box>
        </CardContentContainer>
      </CardContainer>
    );
  },
);

export default Card;
