import { useState } from 'react';
import { useEvent } from 'react-use';

export default function useWindowVisible() {
  const [visible, setVisible] = useState(true);

  const onVisibilityChange = ({ target }: Event) => setVisible(!target['hidden']);

  useEvent('visibilitychange', onVisibilityChange, process.browser ? window : undefined);

  return visible;
}
