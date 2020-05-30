import styled from 'styled-components';

import { getColor } from '@styled/theme';
import Button from '@styled/Button';
import Text from '@styled/Text';

const StyledDonateButton = styled(Button)`
  border-color: ${getColor('neutralMidDark')};
  color: ${getColor('neutralDark')};
  opacity: 0.65;

  :hover {
    opacity: 0.85;
  }
`;

const DonateButton = () => (
  <StyledDonateButton
    as="a"
    href="https://www.buymeacoffee.com/deanbowler"
    target="__blank"
    rel="noopener"
    variant="outline"
    px={[1, 2]}
    py={[1, 2]}
    fontSize={[0, 1]}
  >
    🥑{' '}
    <Text ml={1} fontFamily="cursive">
      Buy me an avocado
    </Text>
  </StyledDonateButton>
);

export default DonateButton;
