import { useMediaQuery } from '@mantine/hooks';
import { createStyles, keyframes } from '@mantine/styles';
import { useState } from 'react';
import { IconType } from 'react-icons';

export interface IconsRowProps {
  icons: {
    icon: IconType;
    href: string;
  }[];
}

// keyframes
const slidingAnimation = keyframes({
  '0%': {
    // transform: 'translate(-2rem, -50%)'
    left: '-2.5rem'
  },
  '100%': {
    left: 'calc( 100% + 2.5rem)'
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
    top: '50%',
    position: 'absolute',
    color: t.colorScheme === 'dark' ? t.white : t.black,
    opacity: 0.5,
    fontSize: '2rem',
    transition: 'opacity .3s ease-in-out',
    transform: 'translate(0, -50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ['&:not(:last-of-type)']: {
      marginRight: '.25rem'
    },
    ['&:hover']: {
      opacity: 1
    },
    animation: `${slidingAnimation} linear forwards infinite`,
    [t.fn.largerThan('md')]: {
      animationDuration: '22s'
    },
    [t.fn.smallerThan('md')]: {
      animationDuration: '10s'
    }
  },
  iconPaused: {
    animationPlayState: 'paused !important'
  }
}));

const IconsRow = ({ icons }: IconsRowProps) => {
  const { classes, cx } = useStyles();
  const [hovered, setHovered] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 966px)', false);

  return (
    <div className={classes.iconsRow}>
      <p className={classes.title}>Experienced with:</p>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={classes.iconsWrapper}>
        {icons.map(({ icon, href }, i) => {
          const I = icon;
          return (
            <a
              href={href}
              target='_blank'
              rel='noreferrer'
              key={i}
              className={cx(classes.icon, hovered && classes.iconPaused)}
              style={{
                // animationDelay: i * 2.75 + 's'
                animationDelay: i * (isDesktop ? 2.75 : 1.25) + 's'
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
