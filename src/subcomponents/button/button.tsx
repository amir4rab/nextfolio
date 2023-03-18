import Link from 'next/link';
import { MouseEventHandler, CSSProperties } from 'react';
import { ReactNode } from 'react';

import classes from './button.module.scss';

export interface ButtonProps {
  disabled?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler;
  className?: string;
  style?: CSSProperties;
  type?: 'button' | 'link';
  href?: string;
}

const Button = ({
  children,
  href,
  className,
  type = 'button',
  ...props
}: ButtonProps) => {
  return type === 'button' ? (
    <button className={[classes._btn, className].join(' ')} {...props}>
      {children}
    </button>
  ) : (
    <Link
      href={href ? href : '#'}
      className={[classes._btn, className].join(' ')}
      {...props}>
      {children}
    </Link>
  );
};

export default Button;
