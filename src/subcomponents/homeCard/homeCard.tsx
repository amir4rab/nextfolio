// next
import Link from 'next/link';

// mantine
import { createStyles, keyframes } from '@mantine/styles';

// components
import Button from '@/subcomponents/button';

// styles
import scssClasses from './homeCard.module.scss';

// keyframes
const animateBoxIn = keyframes({
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
  card: {
    position: 'relative',
    padding: `10vh 10vw`,
    minWidth: '100%',
    background:
      t.colorScheme === 'dark' ? t.colors.dark[5] : t.colors[t.primaryColor][2],
    boxShadow: t.shadows.md,
    transition: 'transform .1s ease-in-out',
    ['&:hover']: {
      transform: 'translate(0, -.1rem)'
    },
    [t.fn.largerThan('sm')]: {
      borderRadius: t.radius.xl,
      margin: '5vh 0',
      opacity: 0,
      animation: `${animateBoxIn} .5s .2s ease-in-out forwards`
    },
    ['&::after']: {
      [t.fn.smallerThan('sm')]: {
        position: 'absolute',
        left: '-1rem',
        top: 0,
        width: '100vw',
        zIndex: -1,
        height: '100%',
        background:
          t.colorScheme === 'dark'
            ? t.colors.dark[5]
            : t.colors[t.primaryColor][2],
        content: '""'
      }
    }
  },
  title: {
    color: t.colorScheme === 'dark' ? t.white : t.black,
    lineHeight: '115%',
    marginBottom: '7.5vh',
    fontWeight: 600
  },
  name: {
    background: 'transparent',
    textDecoration: 'none',
    userSelect: 'none',
    color: t.colorScheme === 'dark' ? t.primaryColor : t.white,
    [t.fn.largerThan('md')]: {
      padding: t.spacing.xs * 0.75,
      borderRadius: t.radius.sm,
      transition: 'color .1s ease-in-out, background-color .1s ease-in-out',
      ['&:hover']: {
        background: t.colors[t.primaryColor][3],
        color: t.black,
        cursor: 'pointer'
      }
    }
  },
  titleText: {
    opacity: 0.8
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const HomeCard = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.card}>
      <h1 className={classes.title}>
        <span className={classes.titleText}>{'Hi, i am '}</span>
        <a
          className={classes.name}
          href='https://github.com/amir4rab'
          target='_blank'
          rel='noreferrer'>
          {'Amir Arab'}
        </a>
        <span className={classes.titleText}>{' a Front-end Engineer.'}</span>
      </h1>
      <div className={classes.buttonsWrapper}>
        <Link href='/about'>
          <Button
            className={scssClasses._btnSecondary}>
            About me
          </Button>
        </Link>
        <Link href='/about#contact'>
          <Button
            className={scssClasses._btnPrimary}>
            Contact me
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeCard;
