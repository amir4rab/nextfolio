'use client';

import { useEffect, useState } from 'react';
import classes from './toggle.module.scss';

interface Props {
  onChange?: (v: boolean) => void;
  defaultChecked?: boolean;
  label?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const genRandomName = () => (Math.random() * 1_000_000).toFixed(0);

const Toggle = ({
  onChange,
  defaultChecked = false,
  size = 'md',
  label = ''
}: Props) => {
  const [localId, setLocalId] = useState<undefined | string>();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setLocalId(label + '-' + genRandomName());
  }, [label]);

  return (
    <div className={classes.toggle}>
      <input
        id={localId}
        defaultChecked={defaultChecked}
        type='checkbox'
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      <label
        htmlFor={localId}
        style={{
          height: `calc(var(--spacing-${size}) * 1.25)`,
          width: `calc(var(--spacing-${size}) * 2.5)`
        }}>
        {label}
      </label>
    </div>
  );
};

export default Toggle;
