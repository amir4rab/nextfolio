import { useCallback, useEffect, useRef, useState } from 'react';

// react-icons
import type { IconType } from 'react-icons';

// mantine
import { createStyles, keyframes } from '@mantine/styles';

export interface IconsRowProps {
  icons: {
    icon: IconType;
    href: string;
  }[];
}

// keyframes
const slidingAnimation = keyframes({
  '0%': {
    left: '-2.5rem'
  },
  '100%': {
    left: 'calc( 100% + 2.5vw)'
  }
});

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
    transform: 'translate(0, -50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ['&:not(:last-of-type)']: {
      marginRight: '.25rem'
    },
    ['&:hover']: {
      opacity: 1,
      color: t.primaryColor
    },
    animation: `${slidingAnimation} linear forwards infinite`,
    [t.fn.largerThan('md')]: {
      animationDuration: '20s'
    },
    [t.fn.smallerThan('md')]: {
      animationDuration: '10s'
    }
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

const IconsRow = ({ icons }: IconsRowProps) => {
  const { classes, cx } = useStyles();
  const [hovered, setHovered] = useState(false);
  const [delayLength, setDelayLength] = useState<null | number>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const animationCalculations = useCallback(() => {
    if (wrapperRef.current === null) return;

    const isDesktop = window.matchMedia('(min-width: 966px)').matches;
    const width = wrapperRef.current.getBoundingClientRect().width;

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
      <p className={classes.title}>Experienced with:</p>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={classes.iconsWrapper}>
        {delayLength !== null &&
          icons.map(({ icon, href }, i) => {
            const I = icon;
            return (
              <a
                href={href}
                target='_blank'
                rel='noreferrer'
                key={i}
                className={cx(classes.icon, hovered && classes.iconPaused)}
                style={{
                  animationDelay: i * delayLength + 's'
                }}>
                <I />
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default IconsRow;
