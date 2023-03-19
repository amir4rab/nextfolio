import Link from 'next/link';
import { MouseEventHandler, CSSProperties } from 'react';
import { ReactNode } from 'react';

import classes from './button.module.scss';

export interface ButtonProps {
  disabled?: boolean;
  children?: ReactNode;
  onClick?: MouseEventHandler;
  className?: string;
  style?: CSSProperties;
  type?: 'button' | 'link';
  href?: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
}

const Button = ({
  children,
  href,
  className,
  type = 'button',
  rightIcon,
  leftIcon,
  ...props
}: ButtonProps) => {
  return type === 'button' ? (
    <button className={[className, classes._btn].join(' ')} {...props}>
      {leftIcon && leftIcon}
      <span>{children}</span>
      {rightIcon && rightIcon}
    </button>
  ) : (
    <Link
      href={href ? href : '#'}
      className={[className, classes._btn].join(' ')}
      {...props}>
      {leftIcon && leftIcon}
      <span>{children}</span>
      {rightIcon && rightIcon}
    </Link>
  );
};

export default Button;
