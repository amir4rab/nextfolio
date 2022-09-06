import { MouseEventHandler, forwardRef } from 'react';
import { ReactNode } from 'react';

// mantine
import {
  createStyles,
  MantineTheme,
  CSSObject,
  useMantineTheme
} from '@mantine/styles';

const useStyles = createStyles((t, styles?: CSSObject) => ({
  _button: {
    background: t.colors.dark[7],
    color: t.white,
    padding: `${t.spacing.md * 0.75}px ${t.spacing.lg * 1.25}px`,
    fontWeight: 600,
    fontSize: t.fontSizes.sm,
    border: 'none',
    borderRadius: t.radius.md,
    overflow: 'hidden',
    transition: 'transform .1s ease-in-out, background-color .1s ease-in-out',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    ['&:hover']: {
      transform: 'translate(0, -.05rem)',
      background: t.colors.dark[4]
    },
    ['&:active']: {
      transform: 'translate(0, -.1rem)',
      background: t.colors.dark[5]
    },
    ['&:disabled']: {
      opacity: 0.5,
      cursor: 'default',
      ['&:hover']: {
        transform: '',
        background: t.colors.dark[7]
      },
      ['&:active']: {
        transform: '',
        background: t.colors.dark[7]
      }
    },
    ...styles
  }
}));

export interface ButtonProps {
  component?: 'a' | 'button';
  disabled?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler;
  className?: string;
  sx?: (t: MantineTheme) => CSSObject;
}

const Button = forwardRef(
  (
    { component = 'button', children, sx, className, ...props }: ButtonProps,
    ref
  ) => {
    const t = useMantineTheme();
    const { classes, cx } = useStyles(sx ? { ...sx(t) } : {});

    return (
      <>
        {component === 'button' ? (
          <button
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ref={ref}
            className={cx(classes['_button'], className)}
            {...props}>
            {children}
          </button>
        ) : (
          <a
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ref={ref}
            className={cx(classes['_button'], className)}
            {...props}>
            {children}
          </a>
        )}
      </>
    );
  }
);

Button.displayName = 'Button';

export default Button;
