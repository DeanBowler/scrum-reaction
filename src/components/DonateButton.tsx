import { AnchorButton } from '@styled/Button';
import Text from '@styled/Text';

const DonateButton = () => (
  <AnchorButton
    as="a"
    href="https://www.buymeacoffee.com/deanbowler"
    target="__blank"
    rel="noopener"
    variant="outline"
    px={[1, 2]}
    py={[1, 2]}
    fontSize={[0, 1]}
  >
    🥑
    <Text ml={1} fontFamily="cursive">
      Buy me an avocado
    </Text>
  </AnchorButton>
);

export default DonateButton;
