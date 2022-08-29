import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

// react-icons
import type { IconType } from 'react-icons';

// mantine
import {
  createStyles,
  keyframes,
  CSSObject,
  MantineTheme,
  useMantineTheme
} from '@mantine/styles';

export interface IconsRowProps {
  title?: string;
  linker?: boolean;
  icons: {
    icon: IconType;
    href: string;
  }[];
}

// keyframes
const animateIn = keyframes({
  from: {
    opacity: 0,
    transform: `translate(0, -.25rem)`
  },
  to: {
    opacity: 1,
    transform: `translate(0, 0)`
  }
});

// styles
const useStyles = createStyles((t) => ({
  iconsRow: {
    margin: `${t.spacing.xl}px 0`,
    animation: `${animateIn} .3s ease-in forwards`
  },
  title: {
    marginBottom: t.spacing.xs,
    fontSize: t.fontSizes.sm
  },
  iconsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
    height: '4rem',
    width: '100%'
  },
  icon: {
    left: '-2.5rem',
    width: '2.5rem',
    height: '2.5rem',
    top: '50%',
    position: 'absolute',
    color: t.colorScheme === 'dark' ? t.white : t.black,
    opacity: 0.5,
    fontSize: '2rem',
    transition: 'opacity .3s ease-in-out, color .15s ease-in-out',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ['&:not(:last-of-type)']: {
      marginRight: '.25rem'
    },
    ['&:hover']: {
      opacity: 1,
      color: t.primaryColor
    }
    // animation: `${slidingAnimation} linear forwards infinite`,
  },
  iconPaused: {
    animationPlayState: 'paused !important'
  }
}));

/** Calculates amount of delay needed for equal padding between items */
const getTiming = (
  arrayLength: number,
  wrapperWidth: number,
  isDesktop: boolean
) => {
  const animationDuration = isDesktop ? 20 : 10;
  const elementWidth = 40; // 2.5rem * 16 = 40px
  const wrapperWidthWithPadding = wrapperWidth + 80;
  const speed = wrapperWidthWithPadding / animationDuration; // path / duration of path

  const emptySpace = wrapperWidthWithPadding - elementWidth * arrayLength;
  const emptySpacePerItem = emptySpace / arrayLength;

  const durationNeededForPadding = (emptySpacePerItem + elementWidth) / speed;

  return parseFloat(durationNeededForPadding.toFixed(2));
};

const useIconStyles = createStyles((t, styles?: CSSObject) => ({
  wrapper: {
    display: 'block',
    [t.fn.largerThan('md')]: {
      animationDuration: '20s'
    },
    [t.fn.smallerThan('md')]: {
      animationDuration: '10s'
    },
    ...styles
  }
}));

interface IconWrapperProps {
  href?: string;
  key?: string | number;
  className: string;
  children: ReactNode;
  styles: (t: MantineTheme) => CSSObject;
}

const IconWrapper = ({
  styles,
  className,
  children,
  ...props
}: IconWrapperProps) => {
  const t = useMantineTheme();
  const { classes, cx } = useIconStyles(styles(t));

  return (
    <a
      {...props}
      target='_blank'
      rel='noreferrer'
      className={cx(className, classes.wrapper)}>
      {children}
    </a>
  );
};

const IconsRow = ({
  icons,
  title = 'Experienced with',
  linker = false
}: IconsRowProps) => {
  const { classes, cx } = useStyles();
  const [hovered, setHovered] = useState(false);
  const [delayLength, setDelayLength] = useState<null | number>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const wrapperWidth = useRef(0);

  const animationCalculations = useCallback(() => {
    if (wrapperRef.current === null) return;

    const isDesktop = window.matchMedia('(min-width: 966px)').matches;
    const width = wrapperRef.current.getBoundingClientRect().width;
    wrapperWidth.current = width;

    const delay = getTiming(icons.length, width, isDesktop);

    setDelayLength(delay);
  }, [icons.length]);

  useEffect(() => {
    if (wrapperRef.current === null || typeof window === 'undefined') return;

    delayLength === null && animationCalculations();

    window.addEventListener('resize', animationCalculations);

    return () => {
      window.removeEventListener('resize', animationCalculations);
    };
  }, [animationCalculations, delayLength]);

  return (
    <div ref={wrapperRef} className={classes.iconsRow}>
      <p className={classes.title}>{title}</p>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={classes.iconsWrapper}>
        {delayLength !== null &&
          icons.map(({ icon, href }, i) => {
            const I = icon;

            const slidingAnimation = keyframes({
              '0%': {
                transform: 'translate(-2.5rem, -50%)'
              },
              '100%': {
                transform: `translate(calc( ${wrapperWidth.current}px + 2.5rem), -50%)`
              }
            });

            return (
              <IconWrapper
                href={linker ? href : undefined}
                key={i}
                styles={() => ({
                  animation: `${slidingAnimation} linear forwards infinite`,
                  animationDelay: `${i * delayLength}s`
                })}
                className={cx(classes.icon, hovered && classes.iconPaused)}>
                <I />
              </IconWrapper>
            );
          })}
      </div>
    </div>
  );
};

export default IconsRow;
