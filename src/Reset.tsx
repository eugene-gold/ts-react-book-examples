import { memo } from 'react';

type Proprs = {
  onClick: () => void;
};

export const Reset = memo(({ onClick }: Proprs) => {
  console.log('Reset');
  return <button onClick={onClick}>Reset</button>;
});

Reset.displayName = 'Reset';
