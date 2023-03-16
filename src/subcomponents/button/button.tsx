import { MouseEventHandler, CSSProperties } from 'react';
import { ReactNode } from 'react';

import classes from './button.module.scss';

export interface ButtonProps {
  disabled?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler;
  className?: string;
  style?: CSSProperties;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={[classes._btn, className].join(' ')} {...props}>
      {children}
    </button>
  );
};

export default Button;
