import { MouseEventHandler, forwardRef, CSSProperties } from 'react';
import { ReactNode } from 'react';

import classes from './button.module.scss';

export interface ButtonProps {
  disabled?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler;
  className?: string;
  style?: CSSProperties;
}

const Button = forwardRef(({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={[classes._btn, className].join(' ')} {...props}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
